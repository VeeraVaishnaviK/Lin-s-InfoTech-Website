const Lead = require('../models/Lead');
// We reuse the Lead model for contact messages or create a dedicated one if needed.
// According to STEP 2 schemas, we have a Lead model. We'll use a 'Contact Submission' projectType or similar.
// Alternatively, I'll just use the Lead model for both as they are very similar.

/**
 * @desc    Submit contact form (Public)
 * @route   POST /api/contact
 */
exports.submitContact = async (req, res, next) => {
    try {
        // Add a default projectType if not provided
        if (!req.body.projectType) {
            req.body.projectType = 'Other';
        }

        const contact = await Lead.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Message received. We will get back to you soon.',
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get all contact submissions (Admin only)
 * @route   GET /api/contact
 */
exports.getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Lead.find({ status: 'new' }).sort('-createdAt');
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (err) {
        next(err);
    }
};
