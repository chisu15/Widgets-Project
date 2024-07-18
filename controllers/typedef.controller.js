const Typedef = require("../models/typedef.model");

module.exports.index = async (req, res) => {
    try {
        const typedefList = await Typedef.find();
        if (typedefList.length === 0) {
            return res.json({
                code: 204,
                message: "No typedef found"
            })
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: typedefList
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
        const typedef = await Typedef.findById(id);
        if (!typedef) {
            return res.json({
                code: 204,
                message: "No typedef found"
            })
        }
        res.json({
            code: 200,
            message: 'Get data success',
            data: typedef
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
        const typedefCreate = new Typedef({
            ...req.body,
        });
        await typedefCreate.save();
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
        const typedef = await Typedef.findById(id);
        if (!typedef) {
            return res.json({
                code: 204,
                message: "No typedef found"
            })
        }
        await typedef.updateOne({
            ...req.body,
        });
        const newtypedef = await Typedef.findById(id);
        res.json({
            code: 200,
            message: 'Update success',
            data: newtypedef
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
        const typedef = await Typedef.findById(id);
        if (!typedef) {
            return res.json({
                code: 204,
                message: "No typedef found"
            })
        }
        await typedef.deleteOne()
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