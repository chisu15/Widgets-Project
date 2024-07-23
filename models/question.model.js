const mongoose = require("mongoose");
const slugify = require("slugify");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { getNextSequenceValue } = require("../helpers/autoIncrement");
const questionSchema = new mongoose.Schema(
    {
        text: String,
        colums: {
            type: String,
            default: "",
        },
        rows: {
            type: String,
            default: "",
        },
        answer: {
            type: String,
            default: "",
        },
        valid: {
            type: String,
            default: "",
        },
        randomAnswerOrder: {
            type: Boolean,
        },
        type: {
            type: Number,
            ref: "QuestionType",
        },
        image: {
            type: String,
            default: "",
        },
        createdBy: {
            type: Number,
            ref: "User",
        },
        widgetId: {
            type: String,
        },
        ID: {
            type: Number,
            unique: true,
        }
    },
    {
        timestamps: true,
        collection: "Question",
    }
);
questionSchema.pre("save", async function (next) {

    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("question_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});


const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
