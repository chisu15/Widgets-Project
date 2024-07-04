const mongoose = require('mongoose');
const slugify = require('slugify');
const roleSchema = new mongoose.Schema({
    name: String,
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true,
    collection: 'Role'
});


const Role = mongoose.model('Role', roleSchema);
module.exports = Role;