const User = require('../models/userModel');

exports.listUsers = async (req,res) => {
    try {
        const result = await User.find({});
        return res.status(200).json({ success: true, message: "list of all users", result });
    } catch (error) {
        console.log(error);
    }
}

exports.getUser = async (req,res) => {
    const { userId } = req.params;
    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
    } catch (error) {
        console.log(error);
    }
}