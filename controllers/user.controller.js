const User = require("../models/user.model");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors')
const {signAccessToken} = require("../helpers/jwt_service");
const {userValidate} = require("../helpers/validation");

module.exports.index = async (req, res) => {
    try {
        const userList = await User.find().select('-password');
        if (userList.length === 0) {
            return res.json({
                code: 204,
                message: "No user found"
            })
        }
        res.json({
            code: 200,
            message: "Get data success",
            data: userList
        })
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}

module.exports.signup = async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            fullName,
            role
        } = req.body;
        console.log(req.body);
        const {error} = userValidate(req.body)
        if (error) {
            throw createError(error.details[0].message)
        }
        const existed = await User.findOne({
            email : email,
        })
        if (existed){
            throw createError.Conflict(`${email} is ready been registed`);
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            username,
            password: hashedPassword,
            email,
            fullName,
            role
        });
        await user.save();
        res.json({
            code: 200,
            message: "Create account success"
        });
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }

}

module.exports.login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        const user = await User.findOne({
            username
        });
        if (!user) return res.json({
            code: 400,
            message: "Not found user"
        });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.json({
            code: 400,
            message: 'Invalid password'
        });

        const accessToken = await signAccessToken(user._id)

        res.header('Authorization', `bearer ${accessToken}`).send({
            accessToken
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
        const user = await User.findById(id);
        if (!user) {
            return res.json({
                code: 204,
                message : "Not found user"
            })
        }
        await user.deleteOne();
        res.json({
            code : 200,
            message: "Delete user success"
        })
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}
