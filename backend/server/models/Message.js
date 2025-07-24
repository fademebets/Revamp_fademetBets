const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  senderType: { type: String, enum: ['admin', 'user'], required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'senderType' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
