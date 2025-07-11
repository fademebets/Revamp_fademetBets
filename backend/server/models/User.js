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
  // refferals
  // New fields for referral system
  referralCode: { type: String },
  referralCodeExpiry: { type: Date },
  hasReferredUser: { type: Boolean, default: false },
  referredBy: { type: String }, // referral code of the person who referred them
  nextDiscountAmount: { type: Number }, // in percentage
  nextDiscountType: { type: String },
  subscriptionPlan: { type: String, enum: ['monthly', 'quarterly', 'yearly'], default: null },


}, { timestamps: true }); // ✅ timestamps stay here

module.exports = mongoose.model('User', userSchema);
