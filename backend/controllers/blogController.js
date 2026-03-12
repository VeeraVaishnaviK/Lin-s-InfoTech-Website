const Blog = require('../models/Blog');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Get all published blogs (Public)
 * @route   GET /api/blog
 */
exports.getBlogs = async (req, res, next) => {
    try {
        const query = req.user && req.user.role === 'admin' ? {} : { status: 'published' };
        const blogs = await Blog.find(query).sort('-publishedAt -createdAt');

        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get single blog by slug (Public)
 * @route   GET /api/blog/:slug
 */
exports.getBlogBySlug = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return next(ApiError.notFound('Blog post not found'));
        }

        res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Create blog (Admin only)
 * @route   POST /api/blog
 */
exports.createBlog = async (req, res, next) => {
    try {
        req.body.author = req.user.id;
        const blog = await Blog.create(req.body);

        res.status(201).json({
            success: true,
            data: blog,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Update blog (Admin only)
 * @route   PATCH /api/blog/:id
 */
exports.updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!blog) {
            return next(ApiError.notFound('Blog post not found'));
        }

        res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (err) {
        next(err);
    }
};
