const GeneralType = require("../models/generalType.model");
const path = require("path");
const fs = require("fs");
const {imageDir} = require('../helpers/imageDir')

console.log(imageDir("dsad"));
module.exports.index = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const generalTypeList = await GeneralType.find();
        if (generalTypeList.length === 0) {
            return res.json({
                code: 204,
                message: "No generalType found"
            })
        }
        const result = generalTypeList.map(generalType => ({
            ...generalType.toObject(),
            image: generalType.image ? `${baseUrl}${generalType.image}` : null
        }));
        res.json({
            code: 200,
            message: "Get data success",
            data: result
        })
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}

module.exports.detail = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const generalType = await GeneralType.findById(id);
        const image = `${req.protocol}://${req.get('host')}${generalType.image}`;
        if (!generalType) {
            return res.json({
                code: 204,
                message: "No generalType found"
            })
        }
        res.json({
            code: 200,
            message: "generalType retrieved successfully",
            data: {
                ...generalType.toObject(),
                image
            }
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}

module.exports.create = async (req, res) => {
    try {
        const {
            title,
            description
        } = req.body;
        // const image = req.file ? `/uploads/generalType/${req.file.filename}` : '';
        const image = path.join(`/uploads/generalType/`, req.file.filename);
        const generalTypeCreate = new GeneralType({
            title,
            description,
            image
        });
        console.log(generalTypeCreate);
        await generalTypeCreate.save();
        res.json({
            code: 200,
            message: 'Create success',
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}

module.exports.edit = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            title,
            description
        } = req.body;
        let updatedData = {
            title,
            description
        }
        console.log(updatedData);
        const generalType = await GeneralType.findById(id);
        if (!generalType) {
            return res.json({
                code: 204,
                message: "No generalType found"
            })
        }
        if (updatedData.title.length === 0) {
            updatedData.title = generalType.title;
        }
        if (req.file) {
            if (generalType.image) {
                // const oldPath = path.join(__dirname, imageDir(generalType.image));
                const oldPath = path.join(`/uploads/generalType/`, imageDir(generalType.image));
                fs.unlink(oldPath, (err) => {
                    if (err) console.error("Failed to delete old image:", err);
                });
            }
            if (generalType.image == null || generalType.image.length == 0) {
                updatedData.image = path.join(`/uploads/generalType/`, req.file.filename);
            }
            updatedData.image = path.join(`/uploads/generalType/`, req.file.filename);
        }

        await generalType.updateOne({
            ...updatedData
        });
        const updatedGeneralType = await GeneralType.findById(id);
        let image = updatedGeneralType.image;
        if (updatedGeneralType.image.length != 0) {
            image = `${req.protocol}://${req.get('host')}${updatedGeneralType.image}`
        }
        res.json({
            code: 200,
            message: 'Update success',
            data: {
                ...updatedGeneralType.toObject(),
                image
            }
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}

module.exports.delete = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const generalType = await GeneralType.findById(id);
        if (!generalType) {
            return res.json({
                code: 204,
                message: "No generalType found"
            })
        }
        if (generalType.image) {
            // const oldPath = path.join(__dirname, imageDir(generalType.image));
            const oldPath = path.join(`/uploads/generalType/`, imageDir(generalType.image));
            fs.unlink(oldPath, (err) => {
                if (err) console.error("Failed to delete image:", err);
            });
        }
        await generalType.deleteOne()
        res.json({
            code: 200,
            message: 'Delete success'
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}