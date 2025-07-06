const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: { type: String },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  metaDescription: { type: String },
  metaTitle: { type: String },
  slug: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
