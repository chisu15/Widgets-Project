const { ref } = require('joi');
const mongoose = require('mongoose');
const slugify = require('slugify');
const { getNextSequenceValue } = require("../helpers/autoIncrement");
const userSchema = new mongoose.Schema({
    ID:{
        type: Number,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    facebookId: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    picture: String,
    role: {
        type: Number,
        ref: "Role"
    },
    fullName: String
}, {
    timestamps: true,
    collection: 'User'
});
userSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("user_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;