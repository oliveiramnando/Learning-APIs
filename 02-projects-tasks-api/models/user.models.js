const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false //hides password on queries
        }
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;