
const mongoose = require('mongoose');
const slugify = require('slugify');
const typeSchema = new mongoose.Schema({
    title: String,
    description: String,
}, {
    timestamps: true,
    collection: 'TypeDef'
});
typeSchema.pre('save', function (next) {
    let title = this.title;
    if (title && typeof title === 'string') {
        this.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});
typeSchema.pre('updateOne', function (next) {
    let title = this._update.title;
    if (title && typeof title === 'string') {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const TypeDef = mongoose.model('TypeDef', typeSchema);
module.exports = TypeDef;