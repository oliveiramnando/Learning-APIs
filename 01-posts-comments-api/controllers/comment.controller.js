const Post = require('../models/post.models.js');
const Comment = require('../models/comment.models.js');

const readComments = async (req,res) => {
    try {
        const Comments = await Comment.find({});
        res.status(200).json(Comments);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const postComment = async (req,res) => {
    try {
        const { postId } = req.params; 
        const { commenterName, commentBody } = req.body;
        const comment = new Comment({
            postId,
            commenterName,
            commentBody
        });
        await comment.save();
        
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const deleteComment = async (req,res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment){
            res.status(404).json({ message: "Comment Not Found" });
        }
        res.status(200).json({message: "Comment Deleted"});
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}


module.exports = {
    readComments,
    postComment,
    deleteComment
}