const { required } = require("joi");
const mongoose = require("mongoose");
const slugify = require("slugify");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { getNextSequenceValue } = require("../helpers/autoIncrement");
const generalTypeSchema = new mongoose.Schema(
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
        description: {
            type: String,
            default: "",
        },
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
        collection: "GeneralType",
    }
);


generalTypeSchema.pre("save", async function (next) {
    let title = this.title;
    if (title && typeof title === "string") {
        this.slug = slugify(title, {
            lower: true,
        });
    }
    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("generalType_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});

generalTypeSchema.pre("updateOne", function (next) {
    let title = this._update.title;
    if (title && typeof title === "string") {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const GeneralType = mongoose.model("GeneralType", generalTypeSchema);
module.exports = GeneralType;
