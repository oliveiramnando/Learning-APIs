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

const deleteUser = async (req,res) => {
    try {
        const userId = req.params.UserId;
        if (!userId) {
            return res.status(404).json({ message: "User not found "});
        }
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "Successfully deleted" });
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
        // validation
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Both username and password are required" });
        }

        // finding user
        const user = await User.findOne({ username }); // needs a filter object (something within {} ) to search for specific field
        if (!user) {
            return res.status(400).json({ message: "Cannot find user!"});
        }
        
        // checking passwords
        if (await bcrypt.compare(req.body.password , user.password)) {
            res.send("Success");
        } else {
            res.send("Login failed");
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    listUsers,
    deleteUser,
    register,
    login
}