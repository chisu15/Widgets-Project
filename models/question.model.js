const mongoose = require('mongoose');
const slugify = require('slugify');
const questionSchema = new mongoose.Schema({
    text: String,
    colums: {
        type: String,
        default: ''
    },
    rows: {
        type: String,
        default: ''
    },
    answer: {
        type: String,
        default: ''
    },
    valid: {
        type: String,
        default: ''
    },
    randomAnswerOrder: {
        type: Boolean,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionType'
    },
    image: {
        type: String,
        default:""
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    widgetId: {
        type: String,
    }
}, {
    timestamps: true,
    collection: 'Question'
});
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;