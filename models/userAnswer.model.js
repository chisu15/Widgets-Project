const mongoose = require('mongoose');
const slugify = require('slugify');
const { getNextSequenceValue } = require("../helpers/autoIncrement");
const userAnswerSchema = new mongoose.Schema({
    ID:{
        type: Number,
        unique: true,
    },
    examId: {
        type: Number,
        ref: 'Exam'
    },
    sesionId: {
        type: Number,
        ref: "Session"
    },
    questionId: {
        type: Number,
        ref: "Question"
    },
    answerText: String,
    createdBy: {
        type: Number,
        ref: "User"
    },
}, {
    timestamps: true,
    collection: 'UserAnswer'
});
userAnswerSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("userAnswer_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});
const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);
module.exports = UserAnswer;