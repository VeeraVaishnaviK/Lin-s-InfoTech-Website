const Lead = require('../models/Lead');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Create new lead (Public)
 * @route   POST /api/leads
 */
exports.createLead = async (req, res, next) => {
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json({
            success: true,
            data: lead,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get all leads (Admin only)
 * @route   GET /api/leads
 */
exports.getAllLeads = async (req, res, next) => {
    try {
        const leads = await Lead.find().sort('-createdAt');
        res.status(200).json({
            success: true,
            count: leads.length,
            data: leads,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Update lead status or score (Admin only)
 * @route   PATCH /api/leads/:id
 */
exports.updateLead = async (req, res, next) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!lead) {
            return next(ApiError.notFound('Lead not found'));
        }

        res.status(200).json({
            success: true,
            data: lead,
        });
    } catch (err) {
        next(err);
    }
};
