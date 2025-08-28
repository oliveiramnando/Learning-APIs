const User = require('../models/userModel.js');
const hashing = require('../utils/hashing.js');
const { signupSchema } = require('../middlewares/validator.js');

exports.signup = async (req,res) => {
    const { email, password } = req.body;
    try {
        const { error } = signupSchema.validate({ 
            email, 
            password 
        });
        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        }

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all fields"});
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
        return res.status(201).json({ success: true, message: "New User Created!", result});
        
    } catch (error) {   
        console.log(error);
    }
}