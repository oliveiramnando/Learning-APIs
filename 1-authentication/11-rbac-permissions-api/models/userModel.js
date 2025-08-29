const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: [true, "Email must be unique"],
        minLength: [4, "Email not long enough"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        default: "user"
    },
    directPermissions: [{ type: String }],
    status:{
        type: String,
        enum: ["active", "suspended"],
        default: "active"
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);