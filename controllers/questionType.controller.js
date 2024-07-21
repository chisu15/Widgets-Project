const QuestionType = require("../models/questionType.model");
const path = require("path");
const fs = require("fs");
const {imageDir} = require('../helpers/imageDir')

console.log(imageDir("dsad"));
module.exports.index = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const questionTypeList = await QuestionType.find();
        if (questionTypeList.length === 0) {
            return res.json({
                code: 204,
                message: "No questionType found"
            })
        }
        const result = questionTypeList.map(questionType => ({
            ...questionType.toObject(),
            image: questionType.image ? `${baseUrl}${questionType.image}` : null
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
        const questionType = await QuestionType.findById(id);
        const image = `${req.protocol}://${req.get('host')}${questionType.image}`;
        if (!questionType) {
            return res.json({
                code: 204,
                message: "No questionType found"
            })
        }
        res.json({
            code: 200,
            message: "QuestionType retrieved successfully",
            data: {
                ...questionType.toObject(),
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
        // const image = req.file ? `/uploads/questionType/${req.file.filename}` : '';
        const image = path.join(`/uploads/questionType/`, req.file.filename);
        const questionTypeCreate = new QuestionType({
            title,
            description,
            image
        });
        console.log(questionTypeCreate);
        await questionTypeCreate.save();
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
        const questionType = await QuestionType.findById(id);
        if (!questionType) {
            return res.json({
                code: 204,
                message: "No questionType found"
            })
        }
        if (updatedData.title.length === 0) {
            updatedData.title = questionType.title;
        }
        if (req.file) {
            if (questionType.image) {
                // const oldPath = path.join(__dirname, imageDir(questionType.image));
                const oldPath = path.join(`/uploads/questionType/`, imageDir(questionType.image));
                fs.unlink(oldPath, (err) => {
                    if (err) console.error("Failed to delete old image:", err);
                });
            }
            if (questionType.image == null || questionType.image.length == 0) {
                updatedData.image = path.join(`/uploads/questionType/`, req.file.filename)
            }
            updatedData.image = path.join(`/uploads/questionType/`, req.file.filename);
        }

        await questionType.updateOne({
            ...updatedData
        });
        const updatedQuestionType = await QuestionType.findById(id);
        let image = updatedQuestionType.image;
        if (updatedQuestionType.image.length != 0) {
            image = `${req.protocol}://${req.get('host')}${updatedQuestionType.image}`
        }
        res.json({
            code: 200,
            message: 'Update success',
            data: {
                ...updatedQuestionType.toObject(),
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
        const questionType = await QuestionType.findById(id);
        if (!questionType) {
            return res.json({
                code: 204,
                message: "No questionType found"
            })
        }
        if (questionType.image) {
            // path.join(`/uploads/questionType/`, imageDir(questionType.image))
            // const oldPath = path.join(__dirname, imageDir(questionType.image));
            const oldPath = path.join(`/uploads/questionType/`, imageDir(questionType.image));
            fs.unlink(oldPath, (err) => {
                if (err) console.error("Failed to delete image:", err);
            });
        }
        await questionType.deleteOne()
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