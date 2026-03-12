const Invoice = require('../models/Invoice');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Get invoices (Admin sees all, Client sees own)
 * @route   GET /api/invoices
 */
exports.getInvoices = async (req, res, next) => {
    try {
        let query;
        if (req.user.role === 'admin') {
            query = Invoice.find().populate('clientId', 'name email').populate('projectId', 'title');
        } else {
            query = Invoice.find({ clientId: req.user.id }).populate('projectId', 'title');
        }

        const invoices = await query.sort('-createdAt');

        res.status(200).json({
            success: true,
            count: invoices.length,
            data: invoices,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Create invoice (Admin only)
 * @route   POST /api/invoices
 */
exports.createInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.create(req.body);

        res.status(201).json({
            success: true,
            data: invoice,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Update invoice status (Admin only)
 * @route   PATCH /api/invoices/:id
 */
exports.updateInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!invoice) {
            return next(ApiError.notFound('Invoice not found'));
        }

        res.status(200).json({
            success: true,
            data: invoice,
        });
    } catch (err) {
        next(err);
    }
};
