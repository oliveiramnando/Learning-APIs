const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    permissions: [{ type: String }],
    priority: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Role', roleSchema);