const express = require('express');
const router = express.Router();
const { readComments, postComment, deleteComment } = require('../controllers/comment.controller.js');

router.get('/posts/:id/comments', readComments);

router.post('/posts/:id', postComment);

router.delete('/posts/:id/comments/:id', deleteComment);

module.exports = router;