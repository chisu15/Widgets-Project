const mongoose = require('mongoose');
const slugify = require('slugify');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String
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
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'User'
});
const User = mongoose.model('User', userSchema);
module.exports = User;