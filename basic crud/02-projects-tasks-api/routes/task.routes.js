const express = require('express');
const router = express.Router({ mergeParams: true });

const devAuth = require('../middleware/devAuth.js');
const isOwner = require('../middleware/checkOwnership.js');

const { readTasks, createTask, updateTask, deleteTask } = require('../controllers/task.controllers.js');

router.get('/', readTasks);
router.post('/', devAuth, createTask);
router.put('/:TaskId', devAuth, isOwner, updateTask);
router.delete('/:TaskId', devAuth, isOwner, deleteTask);

module.exports = router;