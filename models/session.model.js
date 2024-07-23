const { date } = require("joi");
const mongoose = require("mongoose");
const slugify = require("slugify");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { getNextSequenceValue } = require("../helpers/autoIncrement");
const sessionSchema = new mongoose.Schema(
    {
        ID: {
            type: Number,
            unique: true,
        },
        type: String,
        userId: {
            type: Number,
            ref: "User",
        },
        examId: {
            type: Number,
            ref: "Exam",
        },
        token: String,
        expired: Boolean,
        expireAt: {
            type: Date,
            require: true,
        },
    },
    {
        timestamps: true,
        collection: "Session",
    }
);


sessionSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("session_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});
const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
