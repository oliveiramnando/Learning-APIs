const mongoose = require('mongoose');
const User = require('../models/user.models.js');

const devAuth = async (req,res,next) => {
    try {
        const userId = req.header("X-User-Id"); // reads cucstom HTTP header form request; cheap stand-in for JWT for now
        if (!userId) {
            return res.status(401).json({ message: "Missing X-User-Id header" });
        } 
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid X-User-Id" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = { _id: user._id, username: user.username }; // attches identity to the req object for downstream middleware/controllers
        return next();
    } catch (error){
       return next(error);
    }
};

module.exports = devAuth;