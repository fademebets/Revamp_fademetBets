const ChatMessage = require('../models/Message');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    socket.on('join', ({ userId }) => {
      socket.join(userId);
      console.log(`User/Admin joined room: ${userId}`);
    });

    socket.on('send_message', async ({ senderId, senderType, receiverId, message }) => {
      try {
        const newMessage = new ChatMessage({
          senderId,
          senderType,
          receiverId,
          message
        });
        await newMessage.save();

        io.to(receiverId).emit('receive_message', newMessage);
      } catch (err) {
        console.error('Failed to send message:', err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSocket;
