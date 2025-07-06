const mongoose = require('mongoose');

const evSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  odds: { type: Number, required: true },
  evValue: { type: Number, required: true },
  confidence: { type: String, required: true },
  coverPercentage: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'expired', 'draft'], default: 'draft' }

});

module.exports = mongoose.model('EV', evSchema);
