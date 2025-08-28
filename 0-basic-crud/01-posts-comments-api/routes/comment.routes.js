const express = require('express');
const router = express.Router({ mergeParams: true });
const { readComments, postComment, deleteComment } = require('../controllers/comment.controller.js');

router.get('/', readComments);

router.post('/', postComment);

router.delete('/:commentId', deleteComment);

module.exports = router