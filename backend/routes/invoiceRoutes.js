const express = require('express');
const { getInvoices, createInvoice, updateInvoice } = require('../controllers/invoiceController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getInvoices);

// Admin only routes
router.post('/', restrictTo('admin'), createInvoice);
router.patch('/:id', restrictTo('admin'), updateInvoice);

module.exports = router;
