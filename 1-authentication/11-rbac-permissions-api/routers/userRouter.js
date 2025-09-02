const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.get('/listUsers', userController.listUsers);
router.get('/:userId', userController.getUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;