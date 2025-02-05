const express = require('express');
const router = express.Router();

const authController = require('../Controller/AuthController.js');

router.post('/register-user', authController.registerNewUser );
router.post('/login-user', authController.userLogin);

module.exports = router