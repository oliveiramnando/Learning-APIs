const jwt = require('jsonwebtoken');

const User = require('../models/userModel.js');
const hashing = require('../utils/hashing.js');
const validator = require('../middlewares/validator.js');

exports.signup = async (req,res) => {
    const { email, password } = req.body;
    try {
        const { error } = validator.signUpInSchema.validate({ 
            email, 
            password 
        });
        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already Exists!"});
        }

        const hashedPassword = await hashing.doHash(password, 12);
        const newUser = new User({
            email, 
            password: hashedPassword
        });

        const result = await newUser.save();
        result.password = undefined;
        return res.status(201).json({ success: true, message: "New User Created!", result });

    } catch (error) {   
        console.log(error);
    }
};

exports.signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        const { error } = validator.signUpInSchema.validate({
            email,
            password
        });
        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        }

        const existingUser = await User.findOne({ email }).select('+password');
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found, please sign up"});
        }

        const result = await hashing.compareHash(password, existingUser.password);
        if (!result) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });  
        }

        const token = jwt.sign({
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role     // pass in role to know what role the user is assigned to
            },process.env.TOKEN_SECRET,
            {
                expiresIn: '8h'
            }
        );
        res.cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + 8 * 3600000), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production' }).json({ success: true, token, message: "Login successful!", });

    } catch (error) {
        console.log(error);
    }
};

exports.me = async (req,res) => {
    const userId = req.user._id;
    try {
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthroized" });
        }

        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "Your Profile", user});
    } catch (error) {
        console.log(error);
    }
};

exports.signout = async (req,res) => {
    res.clearCookie('Authorization').status(200).json({ success: true, message: "Successfully signed out" });
};