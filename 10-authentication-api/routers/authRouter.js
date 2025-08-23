const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);

router.patch('/send-verification-code', authController.sendVerificationCode);

module.exports = router;