const Question = require("../models/question.model");
const path = require("path");
const fs = require("fs");
const {imageDir} = require('../helpers/imageDir')

console.log(imageDir("dsad"));
module.exports.index = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const questionList = await Question.find();
        if (questionList.length === 0) {
            return res.json({
                code: 204,
                message: "No question found"
            })
        }
        const result = questionList.map(question => ({
            ...question.toObject(),
            image: question.image ? `${baseUrl}${question.image}` : null
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
        const question = await Question.findById(id);
        const image = `${req.protocol}://${req.get('host')}${question.image}`;
        if (!question) {
            return res.json({
                code: 204,
                message: "No question found"
            })
        }
        res.json({
            code: 200,
            message: "Question retrieved successfully",
            data: {
                ...question.toObject(),
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
        const image = req.file ? `/uploads/question/${req.file.filename}` : '';
        const questionCreate = new Question({
            ...req.body,
            image
        });
        console.log(questionCreate);
        await questionCreate.save();
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
        let updatedData = {
            ...req.body,
        }
        console.log(updatedData);
        const question = await Question.findById(id);
        if (!question) {
            return res.json({
                code: 204,
                message: "No question found"
            })
        }
        if (req.file) {
            if (question.image) {
                const oldPath = path.join(__dirname, imageDir(question.image));
                fs.unlink(oldPath, (err) => {
                    if (err) console.error("Failed to delete old image:", err);
                });
            }
            if (question.image == null || question.image.length == 0) {
                updatedData.image = `/uploads/question/${req.file.filename}`;
            }
            updatedData.image = `/uploads/question/${req.file.filename}`;
        }

        await question.updateOne({
            ...updatedData
        });
        const updatedQuestion = await Question.findById(id);
        let image = updatedQuestion.image;
        if (updatedQuestion.image.length != 0) {
            image = `${req.protocol}://${req.get('host')}${updatedQuestion.image}`
        }
        res.json({
            code: 200,
            message: 'Update success',
            data: {
                ...updatedQuestion.toObject(),
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
        const question = await Question.findById(id);
        if (!question) {
            return res.json({
                code: 204,
                message: "No question found"
            })
        }
        if (question.image) {
            const oldPath = path.join(__dirname, imageDir(question.image));
            fs.unlink(oldPath, (err) => {
                if (err) console.error("Failed to delete image:", err);
            });
        }
        await question.deleteOne()
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