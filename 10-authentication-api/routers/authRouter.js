const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const { identifier } = require('../middlewares/identification.js');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', identifier, authController.signout);

router.patch('/send-verification-code', identifier, authController.sendVerificationCode);
router.patch('/verify-verification-code', identifier, authController.verifyVerificationCode);

router.patch('/change-password', identifier, authController.changePassword);

module.exports = router;