const mongoose = require("mongoose");
const slugify = require("slugify");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { getNextSequenceValue } = require("../helpers/autoIncrement");
const scoreSchema = new mongoose.Schema(
    {
        ID: {
            type: Number,
            unique: true,
        },
        userId: {
            type: Number,
            ref: "User",
        },
        examId: {
            type: Number,
            ref: "Exam",
        },
        score: Float,
    },
    {
        timestamps: true,
        collection: "Score",
    }
);

scoreSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            this.ID = await getNextSequenceValue("score_ID");
        } catch (error) {
            return next(error);
        }
    }
    next();
});
const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;
