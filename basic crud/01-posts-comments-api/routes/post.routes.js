const express = require('express');
const Post = require('../models/post.models');
const router = express.Router();
const { createPost, readPosts, readPost, updatePost, deletePost } = require('../controllers/post.controller.js');

router.post('/', createPost);

router.get('/', readPosts);
router.get('/:postId', readPost);

router.put('/:postId', updatePost);

router.delete('/:postId', deletePost);

module.exports = router;