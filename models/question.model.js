const mongoose = require('mongoose');
const slugify = require('slugify');
const questionSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    widgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Widget"
    },
    content: String,
    type: String,
    order: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    detail: [Object],
    answer: String
}, {
    timestamps: true,
    collection: 'Question'
});
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;