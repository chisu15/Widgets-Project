const Widget = require("../models/widget.model");

module.exports.index = async (req, res) => {
    try {
        const widgetList = await Widget.find();
        if (!widgetList) {
            return res.json({
                code: 204,
                message: "No Widgets found"
            })
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: WidgetList
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