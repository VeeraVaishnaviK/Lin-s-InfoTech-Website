const express = require('express');
const { createLead, getAllLeads, updateLead } = require('../controllers/leadController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createLead);

// Admin only routes
router.use(protect);
router.use(restrictTo('admin'));

router.get('/', getAllLeads);
router.patch('/:id', updateLead);

module.exports = router;
