const express = require('express');
const router = express.Router({ mergeParams: true });

const { readTasks, createTask, updateTask, deleteTask } = require('../controllers/task.controllers.js');

router.get('/', readTasks);
router.post('/', createTask);
router.put('/:TaskId', updateTask);
router.delete('/:TaskId', deleteTask);

module.exports = router;