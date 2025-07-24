const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

const auth = require('../middlewares/authMiddleware');         // user auth
const adminAuth = require('../middlewares/adminAuth'); // admin auth


router.get('/messages/:userId', chatController.getMessagesWithUser);
router.post('/mark-read/:userId', chatController.markMessagesAsRead);

// Route for user to get their chat rooms
router.get('/chatrooms', auth, chatController.getChatRooms);

// Route for admin to get all chat rooms
router.get('/admin/chatrooms', adminAuth, chatController.getChatRooms);

router.post('/chat/dummy', adminAuth, chatController.startDummyChat);


module.exports = router;
