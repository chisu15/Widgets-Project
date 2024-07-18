const mongoose = require('mongoose');
const slugify = require('slugify');
const scoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    examId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam"
    },
    score: Float,
}, {
    timestamps: true,
    collection: 'Score'
});
const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;