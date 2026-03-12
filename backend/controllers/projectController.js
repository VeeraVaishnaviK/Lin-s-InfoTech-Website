const Project = require('../models/Project');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Get all projects (Admin sees all, Client sees their own)
 * @route   GET /api/projects
 */
exports.getProjects = async (req, res, next) => {
    try {
        let query;
        if (req.user.role === 'admin') {
            query = Project.find().populate('clientId', 'name email');
        } else {
            query = Project.find({ clientId: req.user.id });
        }

        const projects = await query.sort('-createdAt');

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get single project
 * @route   GET /api/projects/:id
 */
exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id).populate('clientId', 'name email');

        if (!project) {
            return next(ApiError.notFound('Project not found'));
        }

        // Check ownership
        if (project.clientId._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(ApiError.forbidden('Not authorized to access this project'));
        }

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Create project (Admin only)
 * @route   POST /api/projects
 */
exports.createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            success: true,
            data: project,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Update project status or add timeline update (Admin only)
 * @route   PATCH /api/projects/:id
 */
exports.updateProject = async (req, res, next) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return next(ApiError.notFound('Project not found'));
        }

        // If there's a new update message, push it to the updates array
        if (req.body.updateMessage) {
            project.updates.push({
                message: req.body.updateMessage,
                timestamp: Date.now()
            });
            delete req.body.updateMessage;
        }

        // Update other fields (status, etc.)
        project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (err) {
        next(err);
    }
};
