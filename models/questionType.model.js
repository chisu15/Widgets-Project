const { required } = require("joi");
const mongoose = require("mongoose");
const slugify = require("slugify");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { getNextSequenceValue } = require("../helpers/autoIncrement");
const questionTypeSchema = new mongoose.Schema(
    {
        ID: {
            type: Number,
            unique: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: String,
        image: {
            type: String,
            default: "",
        },
        slug: {
            type: String,
        },
    },
    {
        timestamps: true,
        collection: "QuestionType",
    }
);

questionTypeSchema.pre("save", async function (next) {
    let title = this.title;
    if (title && typeof title === "string") {
        this.slug = slugify(this.title, {
            lower: true,
        });
    }
    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("questionType_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});

questionTypeSchema.pre("updateOne", function (next) {
    let title = this._update.title;
    if (title && typeof title === "string") {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const QuestionType = mongoose.model("QuestionType", questionTypeSchema);
module.exports = QuestionType;
