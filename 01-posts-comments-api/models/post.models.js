const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        title: { 
            type: String,
            default: ""
        },
        body: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("Product", PostSchema);
module.exports = Post;