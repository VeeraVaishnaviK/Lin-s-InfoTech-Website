const express = require('express');
const { submitContact, getAllContacts } = require('../controllers/contactController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', submitContact);

// Admin only routes
router.use(protect);
router.use(restrictTo('admin'));

router.get('/', getAllContacts);

module.exports = router;
