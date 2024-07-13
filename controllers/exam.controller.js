const Exam = require("../models/exam.model");

module.exports.index = async (req, res) => {
    try {
        const examList = await Exam.find();
        if (examList.length === 0) {
            return res.json({
                code: 204,
                message: "No exams found"
            })
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: examList
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
        const exam = await Exam.findById(id);
        if (!exam) {
            return res.json({
                code: 204,
                message: "No exam found"
            })
        }
        res.json({
            code: 200,
            message: 'Get data success',
            data: exam
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
        const examCreate = new Exam({
            ...req.body,
        });
        await examCreate.save();
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
        const exam = await Exam.findById(id);
        if (!exam) {
            return res.json({
                code: 204,
                message: "No exam found"
            })
        }
        await exam.updateOne({
            ...req.body,
        });
        const newexam = await Exam.findById(id);
        res.json({
            code: 200,
            message: 'Update success',
            data: newexam
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
        const exam = await Exam.findById(id);
        if (!exam) {
            return res.json({
                code: 204,
                message: "No exam found"
            })
        }
        await exam.deleteOne()
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