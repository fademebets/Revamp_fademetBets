const express = require('express');
const router = express.Router();
const authController = require('../controllers/LoginController');

// Universal login route for both admins and users
router.post('/login', authController.login);

module.exports = router;
