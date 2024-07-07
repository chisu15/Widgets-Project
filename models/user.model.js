const mongoose = require('mongoose');
const slugify = require('slugify');
const userSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: true,
    },
    fullName: String
}, {
    timestamps: true,
    collection: 'User'
});
const User = mongoose.model('User', userSchema);
module.exports = User;