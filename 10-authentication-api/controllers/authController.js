const jwt = require('jsonwebtoken');
const { signupSchema, signinSchema } = require('../middlewares/validator');
const { doHash, doHashValidation } = require('../utils/hashing');
const User = require('../models/usersModel');
const { exist } = require('joi');

exports.signup = async (req,res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({ email, password }); // runs joi validation on user input

        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        } 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ success: false, message: "User already exists!" });
        }
        const hashPassword = await doHash(password, 12);

        const newUser = new User({
            email,
            password:hashPassword
        });
        const result = await newUser.save();
        result.password = undefined; // we dont to send the hashed password to them
        res.status(201).json({
            success: true, message: "Account has been created successfully", result
        });
        
    } catch (error) {
        console.log(error);
    }
}

exports.signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signinSchema.validate({ email, password });
        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        } 

        const existingUser = await User.findOne({ email }).select('+password');
        if (!existingUser) {
            return res.status(401).json({ success: false, message: "User doesn't exist!" });
        }
        const result = await doHashValidation(password, existingUser.password)
        if (!result) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
        const token = jwt.sign({
                userId: existingUser._id,
                email: existingUser.email,
                verified: existingUser.verified,
            }, process.env.TOKEN_SECRET
        );
        res.cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + 8 * 3600000), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production'}).json({ success: true, token, message: "Log in successful"});

    } catch (error) {
        console.log(error);
    }
}