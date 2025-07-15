const mongoose = require('mongoose');

const lockSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  game: { type: String, required: true },
  pick: { type: String, required: true },
  odds: { type: String, required: true },
  confidence: { type: String, required: true },
  analysis: { type: String, required: true },
  unit: { type: Number, required: true }, // ✅ new field
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'expired', 'draft'], default: 'draft' }
});

module.exports = mongoose.model('Lock', lockSchema);
