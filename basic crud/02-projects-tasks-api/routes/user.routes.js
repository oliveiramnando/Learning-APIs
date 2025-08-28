const express = require('express');
const router = express.Router();

const { listUsers, deleteUser, register, login } = require('../controllers/user.controllers.js');

router.get('/', listUsers); // testing
router.delete('/:UserId', deleteUser)

router.post('/register', register);
router.post('/login', login);

module.exports = router;