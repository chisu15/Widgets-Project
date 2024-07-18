const mongoose = require('mongoose');
const slugify = require('slugify');
const widgetSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    slug: {
        type: String,
        unique: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
}, {
    timestamps: true,
    collection: 'Widget'
});
widgetSchema.pre('save', function (next) {
    let title = this.title;
    if (title && typeof title === 'string') {
        this.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});
widgetSchema.pre('updateOne', function (next) {
    let title = this._update.title;
    if (title && typeof title === 'string') {
        this._update.$set.slug = slugify(title, {
            lower: true,
        });
        next();
    }
});

const Widget = mongoose.model('Widget', widgetSchema);
module.exports = Widget;