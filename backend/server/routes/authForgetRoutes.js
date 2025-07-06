const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controllers/forgetController');

router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);

module.exports = router;
