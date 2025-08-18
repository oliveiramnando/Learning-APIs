const express = require('express');
const router = express.Router();

const isOwner =  require('../middleware/checkOwnership.js');
const { listProjects, readProject, createProject, updateProject, deleteProject } = require('../controllers/project.controllers.js');

router.get('/', listProjects);
router.get('/:ProjectId', readProject);
router.post('/', isOwner, createProject);
router.put('/:ProjectId', isOwner, updateProject);
router.delete('/:ProjectId', isOwner, deleteProject);

module.exports = router;