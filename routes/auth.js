// Defines authentication routes for user signup and login.

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Register a new user
router.post('/signup', authController.signup);

//Authenticate user & get token
router.post('/login', authController.login);

module.exports = router;
