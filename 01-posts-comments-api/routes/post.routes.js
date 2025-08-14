const express = require('express');
const Post = require('../models/post.models');
const router = express.Router();
const { createPost, readPosts, readPost, updatePost, deletePost } = require('../controllers/post.controller.js');

router.post('/', createPost);

router.get('/', readPosts);
router.get('/:id', readPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router 