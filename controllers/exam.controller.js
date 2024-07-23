const Exam = require("../models/exam.model");
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../helpers/jwt_service");
const Session = require("../models/session.model");
const {scheduleSessionExpiry} = require("../helpers/scheduleSession");
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

module.exports.detail = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const exam = await Exam.findOne({ID: id}) || await Exam.findById(id);
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
        const {
            title,
            description,
            duration,
            subjectId,
            widgetId
        } = req.body;
        if (!duration || !title){
            return res.json({
                code: 400,
                message: "Missing information"
            })
        }
        const createBy = req.user._id;
        const exam = new Exam({
            title,
            description,
            duration,
            subjectId,
            widgetId,
            createBy
        });
        await exam.save();
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
        const exam = await Exam.findOne({ID: id}) || await Exam.findById(id);
        if (!exam) {
            return res.json({
                code: 204,
                message: "No exam found"
            })
        }
        await exam.updateOne({
            ...req.body,
        });
        const newexam = await Exam.findOne({ID: id}) || await Exam.findById(id);
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

module.exports.delete = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const exam = await Exam.findOne({ID: id}) || await Exam.findById(id);
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

module.exports.start = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const userId = req.user._id;
        const exam = await Exam.findOne({ID: id}) || await Exam.findById(id);
        if (!exam) return res.json({
            code: 404,
            message: "Exam not found"
        });

        const accessToken = await signAccessToken(userId);
        const expireAt = new Date(Date.now() + exam.duration * 60000);

        const session = new Session({
            type: "exam",
            userId: userId,
            examId: id,
            token: accessToken,
            expired: false,
            expireAt: expireAt
        });
        await session.save();

        scheduleSessionExpiry(session._id, expireAt);

        res.header('Authorization', `Bearer ${accessToken}`).send({
            accessToken
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        });
    }
}