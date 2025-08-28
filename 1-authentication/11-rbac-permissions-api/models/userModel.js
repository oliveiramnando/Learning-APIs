const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: [true, "Email must be unique"],
        minLength: [4, "Email not long enough"],
        lowercase: true,
        select: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        select: false,
    },
    role: {
        type: String,
        enum: ["User", "Moderator", "Admin"],
        default: "User",
        select: true
    },
    directPermissions: ["String"],
    stat:{
        type: String,
        enum: ["Active", "Suspended"],
        default: "Active",
        select: true
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);