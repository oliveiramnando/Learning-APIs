const mongoose = require('mongoose');
const Post = require('../models/postsModel.js');
const { createPostSchema, updatePostSchema } = require('../middlewares/validator.js');

exports.createPost = async (req,res) => {
    const { title, description } = req.body;
    const authorId = req.user.id;
    try {
        // add validaor for create post schema here
        const { error, value } = createPostSchema.validate({ title, description, authorId });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const post = await Post.create({
            title,
            description,
            authorId
        });
        return res.status(200).json({ success: true, message:"Post created successfully", post });
    } catch (error) {
        console.log(error);
    }
}

exports.listPosts = async (req,res) => {
    try {
        const result = await Post.find({});
        return res.status(200).json({ success: true, result });
    } catch (error) {
        console.log(error);
    }
}

exports.getPost = async (req,res) => {
    const { postId } = req.params
    try {
        const existingPost = await Post.findById(postId);
        if (!existingPost) {
            return res.status(404).json({ success: false, message: "Post does not exist!" });
        }
        return res.status(200).json({ success: true, existingPost });
    } catch (error) {
        console.log(error);
    }
}

exports.updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, description } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) { //checks if post id is a valid mongoDb objectId
            return res.status(400).json({ success: false, message: 'Invalid postId' });
        }

        // Validate only provided fields (PATCH semantics)
        const { error } = updatePostSchema.validate({ title, description }, { abortEarly: true }); // abort early stops at the first validation error
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const isAdmin = req.user?.role === 'admin'; // checks if logged in user is admin using role in req.user by the JWT middlware
        const filter = isAdmin  // builds mongoDB query filter. if admin only match with post Id, other wise check userId with author id
            ? { _id: postId }
            : { _id: postId, authorId: req.user.id }; // <— ownership enforced here

        const updates = {}; 
        if (title !== undefined) updates.title = title;     // only include fields that were actually defined
        if (description !== undefined) updates.description = description;

        const updated = await Post.findOneAndUpdate(filter, updates, { new: true });    // attempts to update using filter; new : true tells mongoose to return the new updated object instead of the old one. if no docs match, its because it doesnt exist or user not allowed

        if (!updated) {
            // Admin: post truly not found; User: you don't own it
            return isAdmin
                ? res.status(404).json({ success: false, message: 'Post not found' })
                : res.status(403).json({ success: false, message: 'Forbidden' });
        }

        return res.status(200).json({ success: true, message: 'Post Updated', data: updated });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deletePost = async (req,res) => {
    const { postId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ success: false, message: 'Invalid postId' });
        }
        const isAdmin = req.user?.role === 'admin'; 
        const filter = isAdmin 
            ? { _id: postId }
            : { _id: postId, authorId: req.user.id }; 

        const deleted = await Post.findOneAndDelete(filter);   
        if (!deleted) {
            return isAdmin
                ? res.status(404).json({ success: false, message: 'Post not found' })
                : res.status(403).json({ success: false, message: 'Forbidden' });
        }
        const result = await Post.find({});
        return res.status(200).json({ success: true, message: 'Post Deleted', result });
    } catch (error) {
        console.log(error);
    }
}