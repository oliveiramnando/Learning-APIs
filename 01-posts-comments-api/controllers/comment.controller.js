const Post = require('../models/post.models.js');
const Comment = require('../models/comment.models.js');

const readComments = async (req,res) => {
    try {
        const { filter, value } = req.query;
        const Comments = await Comment.find({});
        
        if (!filter || !value) {
            return res.status(200).json(Comments); // returns statements for control flow
        }
        const filteredComments = Comments.filter(comment => {
            return comment[filter]?.toString().includes(value);
            // comment[filter] -- comment is an object; filter is a string from the query parameters
            // ? -- only continute if the thing before is not null 
            // .toString() -- ensure property is treated as string
            // .inlcudes(value) -- checks if string contains value
        });

        res.status(200).json(filteredComments);
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