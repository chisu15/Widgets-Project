const mongoose = require("mongoose");
const slugify = require("slugify");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { getNextSequenceValue } = require("../helpers/autoIncrement");

const subjectSchema = new mongoose.Schema(
    {
        ID: {
            type: Number,
            unique: true,
        },
        title: String,
        description: String,
        createdBy: {
            type: Number,
            ref: "User",
        },
        slug: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
        collection: "Subject",
    }
);

subjectSchema.pre("save", async function (next) {
    let title = this.title;
    if (title && typeof title === "string") {
        this.slug = slugify(title, {
            lower: true,
        });
    }
    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("subject_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});
subjectSchema.pre("updateOne", function (next) {
    let title = this._update.title;
    if (title && typeof title === "string") {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
