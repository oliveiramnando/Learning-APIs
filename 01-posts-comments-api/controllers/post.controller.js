const Post = require('../models/post.models');

const createPost = async (req,res) => {
    try {
        const post = await Post.create(req.body);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const readPosts = async (req,res) => {
    try { 
        const { filter, value } = req.query;
        const Posts = await Post.find({});

        if (!filter || !value) {
            return res.status(200).json(Posts);
        }
        const filteredPosts = Posts.filter(posts => {
            return posts[filter]?.toString().includes(value);
        });
        res.status(200).json(filteredPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const readPost = async (req,res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePost = async (req,res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body);
        if (!post) {
            res.status(404).json({ message: "Post Not Found." });
        }
        const updatedPost = await Post.findById(postId);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = async (req,res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            res.status(404).json({ message: "Post Not Found." });
        }
        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPost,
    readPosts,
    readPost,
    updatePost,
    deletePost
};