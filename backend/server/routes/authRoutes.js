const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/change-password', authMiddleware, authController.changePassword);

router.get('/subscription-status', authController.getSubscriptionStatus);

router.post('/unsubscribe', authMiddleware, authController.unsubscribeUser);

router.post('/activate-subscription', authController.activateSubscriptionByEmail);

// Update user profile
router.put('/profile', authMiddleware, authController.updateUserProfile);

// Get user profile info
router.get('/profile', authMiddleware, authController.getUserProfile);

router.post('/generate-referral-code', authMiddleware, authController.generateReferralCode);



module.exports = router;
