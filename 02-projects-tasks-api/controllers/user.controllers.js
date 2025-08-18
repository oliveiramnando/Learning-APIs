const User = require('../models/user.models.js');

const register = async (req,res) => {
    try {
        const { username, password } = req.body;
        if (password.length < 8) {
            return res.status(400).json({ message: "Password not long enough"});
        }
        const user = await User.create({
            username,
            password
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login
}