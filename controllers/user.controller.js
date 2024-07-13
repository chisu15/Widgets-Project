const User = require("../models/user.model");
const Session = require("../models/session.model");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors')
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../helpers/jwt_service");
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
        const refreshToken = await signRefreshToken(user._id)
        const expireAt = new Date(Date.now() + parseInt(process.env.EXPIRE_TIME));
        console.log("ExpireAt---------: ", expireAt);
        const session = new Session({
            type: "user",
            userId: user.id,
            token: accessToken,
            expired: false,
            expireAt: expireAt
        })
        await session.save();
        res.header('Authorization', `bearer ${accessToken}`).send({
            accessToken,
            refreshToken
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

module.exports.refreshToken = async (req, res) => {
    try {
        console.log(req.body);
        const {refreshToken} = req.body;
        if (!refreshToken) {
            res.json({
                code: 400,
                error: 'Bad Request'
            })
        }
        const {userId} = await verifyRefreshToken(refreshToken);
        const user = await User.findById(userId).select('-password');
        const accessToken = await signAccessToken(userId);
        const newRefreshToken = await signRefreshToken(userId);
        res.json({
            code: 200,
            user,
            accessToken,
            newRefreshToken
        })
    } catch (error) {
        res.json({
            code: 400,
            error: error.message
        })
    }
}

module.exports.logout = async (req, res) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        await Session.findOneAndUpdate({ token }, { expired: true });
        res.send('Logged out successfully');
    } catch (error) {
        res.json({ code: 400, error: error.message });
    }
};