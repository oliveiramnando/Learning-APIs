const User = require('../models/user.models.js');
const bcrypt = require('bcrypt');

const listUsers = async (req,res) => { // testing
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const register = async (req,res) => {
    try {
        const { username, password }  = req.body;

        // validation
        if (!username || !password) {
            return res.status(400).json({ message: "Both username and password are required" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password not long enough" });
        }

        // hashing password
        // const salt = await bcrypt.genSalt(10); // the larger this number the longer it's going to generate the hash; but the more secure it'll be
        // const hashedPassword = await bcrypt.hash(req.body.password, salt); // hashing password
        // in one line:
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // save user
        const user = await User.create({
            username,
            password: hashedPassword
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
    listUsers,
    register,
    login
}