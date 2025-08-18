const express = require('express');
const router = express.Router();

const { list,listUsers, register, login } = require('../controllers/user.controllers.js');

router.get('/', listUsers); // testing

router.post('/register', register);
router.post('/login', login);

module.exports = router;