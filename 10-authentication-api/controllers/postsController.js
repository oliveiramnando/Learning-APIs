const { createPostSchema } = require('../middlewares/validator.js');
const Post = require('../models/postsModel.js');

exports.getPosts = async (req,res) => {
    const { page } = req.query;
    const postsPerPage = 10;

    try {
        let pageNum = 0;
        if (page <= 1) {    // pagination
            pageNum = 0;
        } else {
            pageNum = page - 1;
        }
        const result = await Post.find().sort({ createdAt: -1 }).skip(pageNum * postsPerPage).limit(postsPerPage).populate({
            path: 'userId',
            select: 'email'
        }); // sorts at created time; skip some posts if page incrementsl; limit to postPErPage; and querying data
        res.status(200).json({ success: true, message: "Posts", data:result });


    } catch (error) {
        console.log(error);
    }
};

exports.singlePost = async (req,res) => {
    const { _id } = req.query;
    try {
        const existingPost = await Post.findOne({ _id }).populate({
            path: 'userId',
            select: 'email'
        }); // sorts at created time; skip some posts if page incrementsl; limit to postPErPage; and querying data
        if (!existingPost) {
            return res.status(404).json({ success:false, message: "Post not found" });
        }
        res.status(200).json({ success: true, message: "Single Post", data:result });

    } catch (error) {
        console.log(error);
    }
};

exports.createPost = async (req,res) => {
    const { title, description } = req.body;
    const { userId } = req.user;
    try {
        const { error, value } = createPostSchema.validate({ title, description, userId });
        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        } 

        const result = await Post.create({
            title,
            description,
            userId
        });
        return res.status(201).json({ success:true, message: "Post created", data: result });
    } catch (error) {
        console.log(error);
    }
};


exports.updatePost = async (req,res) => {
    const { title, description } = req.body;
    const { userId } = req.user;
    const { _id } = req.query;
    
    try {
        const { error, value } = createPostSchema.validate({ title, description, userId }); //can use this schema
        if (error) {
            return res.status(401).json({ success:false, message: error.details[0].message });
        } 

        const existingPost = await Post.findOne({ _id });
        if (!existingPost) {
            return res.status(403).json({ success:false, message: "Post not found" });
        }

        if (existingPost.userId.toString() !== userId) {
            return res.status(401).json({ success:false, message: "Unauthorized Access" });
        }

        existingPost.title = title;
        existingPost.description = description

        const result = await existingPost.save();

        return res.status(200).json({ success:true, message: "Post Updated", data: result });
    } catch (error) {
        console.log(error);
    }
};