const express = require('express');
const postsController = require('../controllers/postsController.js');

const router = express.Router();

router.post('/', postsController.createPost);
router.get('/', postsController.listPosts);
router.get('/:postId', postsController.getPost);
router.patch('/:postId', postsController.updatePost);
router.delete('/:postId', postsController.deletePost);

module.exports = router;