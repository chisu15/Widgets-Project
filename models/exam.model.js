const mongoose = require('mongoose');
const slugify = require('slugify');
const examSchema = new mongoose.Schema({
    title: String,
    description: String,
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    slug: {
        type: String,
        unique: true
    }

}, {
    timestamps: true,
    collection: 'Exam'
});

examSchema.pre('save', function (next) {
    let title = this.title;
    if (title && typeof title === 'string') {
        this.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});
examSchema.pre('updateOne', function (next) {
    let title = this._update.title;
    if (title && typeof title === 'string') {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;