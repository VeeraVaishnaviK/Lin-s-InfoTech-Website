const express = require('express');
const aiController = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * AI tools often cost money/tokens, so we can apply protection 
 * or different rate limits here. Chatbot is usually public.
 */

router.post('/chatbot', aiController.chatbot);

// Tools might be protected or require higher rate limits
router.post('/estimator', aiController.estimator);
router.post('/proposal', aiController.proposal);
router.post('/analyzer', aiController.analyzer);
router.post('/validator', aiController.validator);

module.exports = router;
