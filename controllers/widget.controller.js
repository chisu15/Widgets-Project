const Widget = require("../models/widget.model");
const Question = require("../models/question.model");
module.exports.index = async (req, res) => {
    try {
        const widgetList = await Widget.find();
        if (widgetList.length === 0){
            return res.json({
                code: 204,
                message: "No Widgets found"
            })
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: widgetList
        })
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}

module.exports.detail = async (req, res)=> {
    try {
        const {
            id
        } = req.params;
        const widget = await Widget.findOne({ID: id}) || await Widget.findById(id);
        if (!widget) {
            return res.json({
                code: 204,
                message: "No widget found"
            })
        }
        res.json({
            code: 200,
            message: "Widget retrieved successfully",
            data: widget
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
        const data = req.body;
        
        const widgetCreate = new Widget({
            ...req.body,
        });
        await widgetCreate.save();
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
        const widget = await Widget.findOne({ID: id}) || await Widget.findById(id);
        if (!widget) {
            return res.json({
                code: 204,
                message: "No widget found"
            })
        }
        await widget.updateOne({
            ...req.body,
        });
        const newWidget = await Widget.findOne({ID: id}) || await Widget.findById(id);
        res.json({
            code: 200,
            message: 'Update success',
            data: newWidget
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
        const widget = await Widget.findOne({ID: id}) || await Widget.findById(id);
        if (!widget) {
            return res.json({
                code: 204,
                message: "No widget found"
            })
        }
        await widget.deleteOne()
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

module.exports.getQuestions = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}