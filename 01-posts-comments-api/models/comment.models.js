const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
            required: true
        },
        commenterName: {
            type: String,
            required: true
        },
        commentBody: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
