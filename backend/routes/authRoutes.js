const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

/**
 * Public routes (rate-limited)
 */
router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

/**
 * Protected routes
 */
router.use(protect);

router.get('/me', authController.getMe);

module.exports = router;
