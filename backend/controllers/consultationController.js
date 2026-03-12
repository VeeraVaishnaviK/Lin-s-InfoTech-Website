const Consultation = require('../models/Consultation');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Book consultation (Public)
 * @route   POST /api/consultations
 */
exports.bookConsultation = async (req, res, next) => {
    try {
        const consultation = await Consultation.create(req.body);
        res.status(201).json({
            success: true,
            data: consultation,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get all consultations (Admin only)
 * @route   GET /api/consultations
 */
exports.getConsultations = async (req, res, next) => {
    try {
        const consultations = await Consultation.find().sort('date time');
        res.status(200).json({
            success: true,
            count: consultations.length,
            data: consultations,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Update consultation status (Admin only)
 * @route   PATCH /api/consultations/:id
 */
exports.updateConsultation = async (req, res, next) => {
    try {
        const consultation = await Consultation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!consultation) {
            return next(ApiError.notFound('Consultation not found'));
        }

        res.status(200).json({
            success: true,
            data: consultation,
        });
    } catch (err) {
        next(err);
    }
};
