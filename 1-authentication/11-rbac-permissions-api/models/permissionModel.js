const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    resource: {
        type: String
    },
    action: {
        type: String
    },
    scope: {
        type: String,
        enum: ["own", "any"]
    },
    description: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Permission', permissionSchema)