const mongoose = require('mongoose');
const slugify = require('slugify');
const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    slug: {
        type: String,
        unique: true
    }
}, {
    timestamps: true,
    collection: 'Role'
});

roleSchema.pre('save', function (next) {
    let title = this.title;
    if (title && typeof title === 'string') {
        this.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});
roleSchema.pre('updateOne', function (next) {
    let title = this._update.title;
    if (title && typeof title === 'string') {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;