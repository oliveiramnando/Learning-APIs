const express = require('express');
const router = express.Router({ mergeParams: true });

const devAuth = require('../middleware/devAuth.js');
const isOwner =  require('../middleware/checkOwnership.js');
const { listProjects, readProject, createProject, updateProject, deleteProject } = require('../controllers/project.controllers.js');

router.get('/', listProjects);
router.get('/:ProjectId', readProject);
router.post('/', devAuth, createProject);
router.put('/:ProjectId', devAuth, isOwner, updateProject);
router.delete('/:ProjectId', devAuth, isOwner, deleteProject);

module.exports = router;