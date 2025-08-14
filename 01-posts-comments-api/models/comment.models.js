const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
    {
        PostId: {
            type: ObjectId,
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
