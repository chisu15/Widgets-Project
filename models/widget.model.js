const mongoose = require("mongoose");
const slugify = require("slugify");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { getNextSequenceValue } = require("../helpers/autoIncrement");
const widgetSchema = new mongoose.Schema(
    {
        ID: {
            type: Number,
            unique: true,
        },
        title: {
            type: String,
            default: "Untitle",
        },
        description: {
            type: String,
            default: "",
        },
        generalTypeId: {
            type: Number,
            ref: "GeneralType",
            required: true,
        },
        createdBy: {
            type: Number,
            ref: "User",
        },
        slug: {
            type: String,
        },
        data: [
            {
                type: mongoose.Schema.Types.Mixed,
                default: "",
            },
        ],
    },
    {
        timestamps: true,
        collection: "Widget",
    }
);



widgetSchema.pre("save", async function (next) {
    let title = this.title;
    if (title && typeof title === "string") {
        this.slug = slugify(title, {
            lower: true,
        });

    }
    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("widget_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});
widgetSchema.pre("updateOne", function (next) {
    let title = this._update.title;
    if (title && typeof title === "string") {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
    }
    next();
});

const Widget = mongoose.model("Widget", widgetSchema);
module.exports = Widget;
