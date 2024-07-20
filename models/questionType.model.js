const {
    required
} = require('joi');
const mongoose = require('mongoose');
const slugify = require('slugify');
const questionTypeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    image: {
        type: String,
        default: "",
    },
    slug: {
        type: String,
    }
}, {
    timestamps: true,
    collection: 'QuestionType'
});

questionTypeSchema.pre('save', function (next) {
    let title = this.title;
    if (title && typeof title === 'string') {
        this.slug = slugify(this.title, {
            lower: true,
        });
        next();
    }
});

questionTypeSchema.pre('updateOne', function (next) {
    let title = this._update.title;
    if (title && typeof title === 'string') {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const QuestionType = mongoose.model('QuestionType', questionTypeSchema);
module.exports = QuestionType;