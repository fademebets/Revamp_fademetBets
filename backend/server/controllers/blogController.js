const Blog = require('../models/Blog');

// Public: Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching blogs.'
    });
  }
};

// Admin: Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      category,
      content,
      slug
    } = req.body;

    // Basic validation
    if (!title || !category || !content || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, content, and slug are required.'
      });
    }

    const newBlog = new Blog(req.body);
    await newBlog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully.',
      data: newBlog
    });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(400).json({
      success: false,
      message: 'Failed to create blog.',
      error: err.message
    });
  }
};

// Admin: Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully.',
      data: updatedBlog
    });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(400).json({
      success: false,
      message: 'Failed to update blog.',
      error: err.message
    });
  }
};

// Admin: Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully.'
    });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(400).json({
      success: false,
      message: 'Failed to delete blog.',
      error: err.message
    });
  }
};


exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (err) {
    console.error('Error fetching blog by slug:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the blog.',
      error: err.message
    });
  }
};
