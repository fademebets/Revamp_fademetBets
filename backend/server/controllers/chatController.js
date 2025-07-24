const { default: mongoose } = require('mongoose');
const ChatMessage = require('../models/Message');
const User = require('../models/User');

exports.getMessagesWithUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await ChatMessage.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }

};

exports.markMessagesAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    await ChatMessage.updateMany({ senderId: userId, read: false }, { read: true });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update messages' });
  }
};


exports.getChatRooms = async (req, res) => {
  try {
    const isAdmin = !!req.admin;

    if (!isAdmin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const messages = await ChatMessage.find({});

    const chatRoomMap = new Map();

    messages.forEach((msg) => {
      let userId;

      if (msg.senderType === 'user') {
        userId = msg.senderId.toString();
      } else {
        userId = msg.receiverId.toString();
      }

      if (!chatRoomMap.has(userId)) {
        chatRoomMap.set(userId, {
          userId,
          lastMessage: msg.message,
          lastUpdated: msg.createdAt,
        });
      } else {
        const existing = chatRoomMap.get(userId);
        if (msg.createdAt > existing.lastUpdated) {
          existing.lastMessage = msg.message;
          existing.lastUpdated = msg.createdAt;
        }
      }
    });

    const chatRooms = Array.from(chatRoomMap.values());

    // Extract all userIds
    const userIds = chatRooms.map((room) => room.userId);

    // Fetch emails for all users
    const users = await User.find({ _id: { $in: userIds } }, { _id: 1, email: 1 });

    const emailMap = {};
    users.forEach((user) => {
      emailMap[user._id.toString()] = user.email;
    });

    // Add email to each chat room
    const enrichedChatRooms = chatRooms.map((room) => ({
      ...room,
      email: emailMap[room.userId] || 'N/A',
    }));

    res.status(200).json({ chatRooms: enrichedChatRooms });
  } catch (error) {
    console.error('Failed to get chat rooms:', error);
    res.status(500).json({ message: 'Failed to get chat rooms' });
  }
};




exports.startDummyChat = async (req, res) => {
  try {
    const userId = '6880e0dc1f5a7acfce20fce2'; // target user ID
    const adminId = req.admin?._id; // assuming you're using admin auth middleware

    if (!adminId) {
      return res.status(401).json({ message: 'Unauthorized: Admin not found' });
    }

    const dummyMessage = new ChatMessage({
      senderType: 'admin',
      senderId: adminId,
      receiverId: new mongoose.Types.ObjectId(userId),
      message: 'Hello from Admin 👋 (dummy message 2)',
    });

    await dummyMessage.save();

    res.status(201).json({ message: 'Dummy chat started successfully', chat: dummyMessage });
  } catch (error) {
    console.error('Error starting dummy chat:', error);
    res.status(500).json({ message: 'Failed to start dummy chat' });
  }
};
