const JWT = require("jsonwebtoken");
const createError = require('http-errors');
const User = require("../models/user.model");
const Role = require("../models/role.model");
const signAccessToken = async (userId)=>{
    return new Promise((resolve, reject) => {
        const payload = {userId};
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: process.env.EXPIRE_TIME //10m 10s
        }

        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        })
    })
}

const verifyAccessToken = (roles = []) => {
    return async (req, res, next) => {
        if (!req.headers['authorization']) {
            return res.status(401).json({
                code: 401,
                message: "Unauthorized"
            });
        }
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
            if (err) {
                return res.status(401).json({
                    code: 401,
                    message: err.message
                });
            }
            req.payload = payload;
            const user = await User.findById(payload.userId).select('-password');
            const roleID = user.role;
            const userRole = await Role.findOne({ID: roleID})
            if (!user || !userRole) {
                return res.status(403).json({
                    code: 403,
                    message: "Forbidden"
                });
            }
            req.user = user;
            next();
        });
    };
};

const signRefreshToken = async (userId)=>{
    return new Promise((resolve, reject) => {
        const payload = {userId};
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: '1y'
        }

        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        })
    })
}

const verifyRefreshToken = async (refreshToken)=>{
    return new Promise( (resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if(err) {
                return reject(err);
            }
            resolve(payload);
        })
    });
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}