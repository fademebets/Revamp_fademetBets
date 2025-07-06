const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');

const adminAuth = require('../middlewares/adminAuth');

router.post('/register', adminAuthController.register);

router.post('/notify-lock-update', adminAuthController.notifyLockUpdate);

router.post('/change-password', adminAuthController.changePasswordWithToken);

router.get('/profile', adminAuth, (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = router;
