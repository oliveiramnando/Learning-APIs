const Post = require('../models/postsModel.js');
const { createPostSchema } = require('../middlewares/validator.js');

exports.createPost = async (req,res) => {
    const { title, description } = req.body;
    try {
        // add validaor for create post schema here
        const { error, value } = createPostSchema.validate({ title, description });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const post = await Post.create({
            title,
            description
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

exports.updatePost = async (req,res) => {
    const { postId } = req.params;
    const { title, description } = req.body;
    try {
        const { error, value } = createPostSchema.validate({ title, description });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existingPost = await Post.findById(postId);
        if (!existingPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // add validator for udpate post
        // /////


        // const updatedPost = await Post.findByIdAndUpdate(postId,     // alternative???
        //     {$set: title, description},
        //     {new: true, runValidators: true}
        // );
        // return res.status(200).json({ success: true, message: "Post Updated", updatedPost});

        existingPost.title = title;
        existingPost.description = description

        const result = await existingPost.save();

        return res.status(200).json({ success:true, message: "Post Updated", data: result });
        
    } catch (error) {
        console.log(error);
    }
}

exports.deletePost = async (req,res) => {
    const { postId } = req.params;
    try {
        const existingPost = await Post.findById(postId);
        if (!existingPost) {
            return res.status(404).json({ success: false, message: "post not found" });
        }
        await Post.findByIdAndDelete(postId);
        return res.status(200).json({ success: true, message: "post successfully deleted" });
    } catch (error) {
        console.log(error);
    }
}