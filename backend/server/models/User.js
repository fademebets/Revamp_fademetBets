const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firstName: { type: String },         // ✅ added
  lastName: { type: String },          // ✅ added
  phoneNumber: { type: String },       // ✅ added
  address: { type: String },           // ✅ added
  stripeCustomerId: String,
  subscriptionId: String, // ✅ Add this line
  subscriptionStatus: { type: String, default: 'inactive' },
  resetCode: { type: String },
  subscriptionEndDate: { type: Date },
  resetCodeExpiry: { type: Date },
  lastSessionId: { type: String },
  
}, { timestamps: true }); // ✅ timestamps stay here

module.exports = mongoose.model('User', userSchema);
