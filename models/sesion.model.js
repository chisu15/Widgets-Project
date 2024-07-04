const mongoose = require('mongoose');
const slugify = require('slugify');
const sesionSchema = new mongoose.Schema({
    type: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
}, {
    timestamps: true,
    collection: 'Sesion'
});


const Sesion = mongoose.model('Sesion', sesionSchema);
module.exports = Sesion;