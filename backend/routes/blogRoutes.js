const express = require('express');
const { getBlogs, getBlogBySlug, createBlog, updateBlog } = require('../controllers/blogController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Admin only routes
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', createBlog);
router.patch('/:id', updateBlog);

module.exports = router;
