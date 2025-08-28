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

        const existingUser = await User.findOne({ email });
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
            },process.env.TOKEN_SECRET,
            {
                expiresIn: '8h'
            }
        );
        res.cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + 8 * 3600000), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production' }).json({ success: true, message: "Login successful!"});

    } catch (error) {
        console.log(error);
    }
}