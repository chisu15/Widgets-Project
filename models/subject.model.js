const mongoose = require('mongoose');
const slugify = require('slugify');
const subjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    slug: String
}, {
    timestamps: true,
    collection: 'Subject'
});
subjectSchema.pre('save', function (next) {
    let title = this.title;
    if (title && typeof title === 'string') {
        this.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});
subjectSchema.pre('updateOne', function (next) {
    let title = this._update.title;
    if (title && typeof title === 'string') {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;