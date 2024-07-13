const Session = require("../models/session.model");

module.exports.index = async (req, res)=>{
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
module.exports.detail = async (req, res) => {
    try {
        const {id} = req.params;
        const session = await Session.findOne({id});
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
        const {id} = req.params;
        const session = await Session.findOne({id});
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