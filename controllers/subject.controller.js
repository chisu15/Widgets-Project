const Subject = require("../models/subject.model");

module.exports.index = async (req, res) => {
    try {
        const subjectList = await Subject.find();
        if (!subjectList) {
            return res.json({
                code: 204,
                message: "No subjects found"
            })
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: subjectList
        })
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}

module.exports.create = async (req, res) => {
    try {
        const subjectCreate = new Subject({
            ...req.body,
        });
        await subjectCreate.save();
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