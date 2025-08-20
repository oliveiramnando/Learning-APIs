const mongoose = require('mongoose');

const userScehma = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        trim: true, // gets rid of spaces before and after
        unique: [, "Email must be unique!"], // checks if email is unique
        minLength: [5, "Email must have at least 5 characters"],
        lowercase: true // makes input all lowercase
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        trim: true,
        select: false // whil we query users, password should not be fetched from DB automatically unless state otherwise
    },
    verified: {
        type: boolean,
        default: false
    },
    verificationCode: { // storing code for verification process
        type: String,
        select: false
    },
    verificationCodeValidation: {
        type: Number,
        select: false
    },
    forgotPasswordCode: {
        type: String,
        select: false
    },
    forgotPasswordCodeValidation: {
        type: Number,
        select: false
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userScehma);