const { signupSchema} = require('../middlewares/validator');
const User = require('../models/usersModel');

exports.signup = async (req,res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({ email, password });

        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        } 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ success: false, message: "User already exists!" });
        }
        
    } catch (error) {
        console.log(error);
    }
}