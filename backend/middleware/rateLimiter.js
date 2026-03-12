/**
 * Rate limiter middleware using express-rate-limit.
 * Provides a general limiter and a stricter auth limiter.
 */
const rateLimit = require('express-rate-limit');
const config = require('../config');

/**
 * General API rate limiter — 100 requests per 15 minutes.
 */
const generalLimiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMax,
    message: {
        success: false,
        status: 429,
        message: 'Too many requests. Please try again later.',
    },
    standardHeaders: true, // Return rate limit info in RateLimit-* headers
    legacyHeaders: false,  // Disable X-RateLimit-* headers
});

/**
 * Stricter rate limiter for auth routes — 20 requests per 15 minutes.
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        status: 429,
        message: 'Too many authentication attempts. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { generalLimiter, authLimiter };
