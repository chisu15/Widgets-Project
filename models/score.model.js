const mongoose = require('mongoose');
const slugify = require('slugify');
const scoreSchema = new mongoose.Schema({
    widgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Widget'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    score: Float,
}, {
    timestamps: true,
    collection: 'Score'
});
const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;