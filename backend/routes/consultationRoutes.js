const express = require('express');
const { bookConsultation, getConsultations, updateConsultation } = require('../controllers/consultationController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', bookConsultation);

// Admin only routes
router.use(protect);
router.use(restrictTo('admin'));

router.get('/', getConsultations);
router.patch('/:id', updateConsultation);

module.exports = router;
