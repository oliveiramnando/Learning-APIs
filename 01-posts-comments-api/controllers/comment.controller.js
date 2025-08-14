const Comment = require('../models/comment.models.js');

const readComments = async (req,res) => {
    try {
        const Comments = await Comment.findById({});
        res.status(200).json(Comments);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const postComment = async (req,res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const deleteComment = async (req,res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment){
            res.status(404).json({ message: "Comment Not Found" });
        }
        res.status(200).json({message: "Comment Deleted"});
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}


module.export = {
    readComments,
    postComment,
    deleteComment
}