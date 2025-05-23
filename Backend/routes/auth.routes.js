const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Register and login routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
