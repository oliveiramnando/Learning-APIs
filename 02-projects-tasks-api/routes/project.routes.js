const express = require('express');
const router = express.Router();

const { listProjects, readProject, createProject, updateProject, deleteProject } = require('../controllers/project.controllers.js');

router.get('/', listProjects);
router.get('/:ProjectId', readProject);

router.post('/', createProject);

router.put('/:ProjectId', updateProject);

router.delete('/:ProjectId', deleteProject);

module.exports = router;