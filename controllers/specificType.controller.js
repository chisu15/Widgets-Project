const SpecificType = require("../models/questionType.model");

module.exports.index = async (req, res) => {
    try {
        const specificTypeList = await SpecificType.find();
        if (specificTypeList.length === 0) {
            return res.json({
                code: 204,
                message: "No SpecificType found"
            })
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: specificTypeList
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
        const specificType = await SpecificType.findById(id);
        if (!specificType) {
            return res.json({
                code: 204,
                message: "No SpecificType found"
            })
        }
        res.json({
            code: 200,
            message: 'Get data success',
            data: SpecificType
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
        if (!data.generalTypeId.length || !data.generalTypeId){
            return res.json({
                code: 400,
                message: "Missing general type"
            })
        }
        const specificTypeCreate = new SpecificType({
            ...data,
        });
        await specificTypeCreate.save();
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
        const specificType = await SpecificType.findById(id);
        if (!specificType) {
            return res.json({
                code: 204,
                message: "No SpecificType found"
            })
        }
        await specificType.updateOne({
            ...req.body,
        });
        const newSpecificType = await SpecificType.findById(id);
        res.json({
            code: 200,
            message: 'Update success',
            data: newSpecificType
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
        const specificType = await SpecificType.findById(id);
        if (!specificType) {
            return res.json({
                code: 204,
                message: "No SpecificType found"
            })
        }
        await specificType.deleteOne()
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