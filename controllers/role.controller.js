const Role = require("../models/role.model");

module.exports.index = async (req, res) => {
    try {
        const roleList = await Role.find();
        if (roleList.length === 0) {
            return res.json({
                code: 204,
                message: "No role found",
            });
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: roleList,
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message,
        });
    }
};

module.exports.detail = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findOne({ID: id }) || await Role.findById(id);
        if (!role) {
            return res.json({
                code: 204,
                message: "No Role found",
            });
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: role,
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message,
        });
    }
};

module.exports.create = async (req, res) => {
    try {
        const roleCreate = new Role({
            ...req.body,
        });
        await roleCreate.save();
        res.json({
            code: 200,
            message: "Create success",
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message,
        });
    }
};

module.exports.edit = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findOne({ID: id}) || await Role.findById(id);
        console.log("..............", role);
        if (!role) {
            return res.json({
                code: 204,
                message: "No Role found",
            });
        }
        await role.updateOne({
            ...req.body,
        });
        const newRole = await Role.findOne({ID: id}) || await Role.findById(id);
        res.json({
            code: 200,
            message: "Update success",
            data: newRole,
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message,
        });
    }
};

module.exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findOne({ID: id}) || await Role.findById(id);
        console.log("delete", role);
        if (!role) {
            return res.json({
                code: 204,
                message: "No Role found",
            });
        }
        await role.deleteOne();
        res.json({
            code: 200,
            message: "Delete success",
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message,
        });
    }
};
