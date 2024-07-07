const JWT = require("jsonwebtoken");
const createError = require('http-errors');
const { create } = require("../models/subject.model");

const signAccessToken = async (userId)=>{
    return new Promise((resolve, reject) => {
        const payload = {userId};
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '1h' //10m 10s
        }

        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if(!req.headers['authorization']){
        return res.status(401).json({
            code: 401,
            message: "Unauthorized"
        });
    }
    const authHeader = req.headers['authorization'];
    const bearedToken = authHeader.split(' ');
    const token = bearedToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err) {
            return res.status(401).json({
                code: 401,
                message: "Unauthorized"
            });
        }
        req.payload = payload;
        next();
    })
}

module.exports = {
    signAccessToken,
    verifyAccessToken
}