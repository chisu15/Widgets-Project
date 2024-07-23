const mongoose = require("mongoose");
const slugify = require("slugify");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { getNextSequenceValue } = require("../helpers/autoIncrement");
const roleSchema = new mongoose.Schema(
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
        collection: "Role",
    }
);

roleSchema.pre("save", async  function (next) {
    let title = this.title;
    if (title && typeof title === "string") {
        this.slug = slugify(title, {
            lower: true,
        });
    }
    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("role_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});
roleSchema.pre("updateOne", function (next) {
    let title = this._update.title;
    console.log(' roleSchema.pre("updateOne", function (next)  called');
    if (title && typeof title === "string") {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
    console.log(12312321);
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
