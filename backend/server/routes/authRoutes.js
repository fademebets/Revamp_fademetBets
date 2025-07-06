const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Forgot password - send reset code
router.post('/forgot-password', authController.forgotPassword);

// Reset password - verify code and set new password
router.post('/reset-password', authController.resetPassword);


router.post('/change-password', authMiddleware, authController.changePassword);

router.get('/subscription-status', authController.getSubscriptionStatus);

router.post('/unsubscribe', authMiddleware, authController.unsubscribeUser);

router.post('/activate-subscription', authController.activateSubscriptionByEmail);

// Update user profile
router.put('/profile', authMiddleware, authController.updateUserProfile);

// Get user profile info
router.get('/profile', authMiddleware, authController.getUserProfile);




module.exports = router;
