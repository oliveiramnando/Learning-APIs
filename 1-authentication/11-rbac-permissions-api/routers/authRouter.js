const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
// router.get('/me', authController.me)
// router.post('/logout', authController.logout)

module.exports = router;