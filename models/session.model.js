const { date } = require('joi');
const mongoose = require('mongoose');
const slugify = require('slugify');
const sessionSchema = new mongoose.Schema({
    type: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    token: String,
    expired: Boolean,
    expireAt: {
        type: Date,
        require: true
    }
}, {
    timestamps: true,
    collection: 'Session'
});


const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;