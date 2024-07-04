const mongoose = require('mongoose');
const slugify = require('slugify');
const userAnswerSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    sesionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sesion"
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    answerText: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true,
    collection: 'UserAnswer'
});
const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);
module.exports = UserAnswer;