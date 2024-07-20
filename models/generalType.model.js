const mongoose = require('mongoose');
const slugify = require('slugify');
const generalTypeSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true,
    collection: 'GeneralType'
});

generalTypeSchema.pre('save', function (next) {
    let title = this.title;
    if (title && typeof title === 'string') {
        this.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

generalTypeSchema.pre('updateOne', function (next) {
    let title = this._update.title;
    if (title && typeof title === 'string') {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const GeneralType = mongoose.model('GeneralType', generalTypeSchema);
module.exports = GeneralType;