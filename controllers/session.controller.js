const Session = require("../models/session.model");

module.exports.index = async (req, res) => {
    try {
        const sessionList = await Session.find();
        if (!sessionList) {
            return res.json({
                code: 204,
                message: "No Session found"
            })
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: sessionList
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}

module.exports.expireAll = async (req, res) => {
    try {
        await Session.updateMany({
            expired: false
        }, {
            expired: true
        });
        res.json({
            code: 200,
            message: "All sessions have been expired."
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        });
    }
}

module.exports.detail = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const session = await Session.findOne({ID: id}) || await Session.findById(id);
        if (!session) {
            return res.json({
                code: 204,
                message: "Not found Session"
            })
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: session
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
        console.log(id);
        const session = await Session.findOne({ID: id}) || await Session.findById(id);
        console.log(session);
        if (!session) {
            return res.json({
                code: 204,
                message: "Not found Session"
            })
        }
        await session.deleteOne()
        res.json({
            code: 200,
            message: "Get data success",
            data: session
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}