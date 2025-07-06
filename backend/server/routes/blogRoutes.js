const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const adminAuth = require('../middlewares/adminAuth');

// Public: Get all blogs
router.get('/', blogController.getAllBlogs);
router.get('/slug/:slug', blogController.getBlogBySlug);

// Admin protected: Create, Update, Delete
router.post('/', adminAuth, blogController.createBlog);
router.put('/:id', adminAuth, blogController.updateBlog);
router.delete('/:id', adminAuth, blogController.deleteBlog);


module.exports = router;
