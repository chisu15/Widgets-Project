const Subject = require("../models/subject.model");

module.exports.index = async (req, res) => {
    try {
        const subjectList = await Subject.find();
        if (subjectList.length === 0) {
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

module.exports.detail= async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findOne({ID: id}) || await Subject.findById(id);
        if (!subject) {
            return res.json({
                code: 204,
                message: "No subject found"
            })
        }
        res.json({
            code: 200,
            message: 'Get data success',
            data: subject
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

module.exports.edit = async (req, res) => {
    try {
        const {id} = req.params;
        const subject = await Subject.findOne({ID: id}) || await Subject.findById(id);
        if (!subject) {
            return res.json({
                code: 204,
                message: "No subject found"
            })
        }
        await subject.updateOne({
            ...req.body,
        });
        const newSubject = await Subject.findOne({ID: id}) || await Subject.findById(id);
        res.json({
            code: 200,
            message: 'Update success',
            data: newSubject
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}

module.exports.delete = async (req, res)=> {
    try {
        const {id} = req.params;
        const subject = await Subject.findOne({ID: id}) || await Subject.findById(id);
        if (!subject) {
            return res.json({
                code: 204,
                message: "No subject found"
            })
        }
        await subject.deleteOne()
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