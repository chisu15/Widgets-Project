const mongoose = require("mongoose");
const slugify = require("slugify");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { getNextSequenceValue } = require("../helpers/autoIncrement");
const examSchema = new mongoose.Schema(
    {
        ID: {
            type: Number,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: String,
        duration: {
            type: Number,
            require: true,
        },
        subjectId: {
            type: Number,
            ref: "Subject",
        },
        slug: {
            type: String,
            unique: true,
        },
        createBy: {
            type: Number,
            ref: "User",
        },
        widgetId: {
            type: Number,
            ref: "Widget",
        },
    },
    {
        timestamps: true,
        collection: "Exam",
    }
);

examSchema.pre("save", async function (next) {
    let title = this.title;
    if (title && typeof title === "string") {
        this.slug = slugify(title, {
            lower: true,
        });
    }
    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("exam_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});
examSchema.pre("updateOne", function (next) {
    let title = this._update.title;
    if (title && typeof title === "string") {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
