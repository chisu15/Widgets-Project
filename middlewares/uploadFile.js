const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
    generateRandomString
} = require("../helpers/generateString");

const createStorage = (uploadDir) => multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {
                recursive: true
            });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + generateRandomString(22);
        const filename = file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
        cb(null, filename);
    }
});

const upload = (fieldName, folderName) => {
    const uploadDir = path.join(__dirname, `../uploads/${folderName}`);
    const storage = createStorage(uploadDir);
    return multer({
        storage: storage
    }).single(fieldName);
};

module.exports = upload;