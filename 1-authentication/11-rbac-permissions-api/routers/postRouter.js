const express = require('express');
const { identifier } = require('../middlewares/identification.js');
const { authorizeRole } = require('../middlewares/roleMiddleware.js');
const postsController = require('../controllers/postsController.js');

const router = express.Router();

router.post('/', identifier, postsController.createPost);
router.get('/', identifier, postsController.listPosts);
router.get('/:postId', identifier, postsController.getPost);
router.patch('/:postId', identifier, postsController.updatePost);
router.delete('/:postId', identifier, postsController.deletePost);

module.exports = router;