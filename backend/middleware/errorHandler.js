/**
 * Global error-handling middleware.
 * Catches all errors thrown in route handlers and returns structured JSON responses.
 */
const logger = require('../utils/logger');
const config = require('../config');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    // Default to 500 if no status code is set
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    // Log error details in development
    if (config.nodeEnv === 'development') {
        logger.error(`[${statusCode}] ${message}`);
        if (err.stack) {
            logger.debug(err.stack);
        }
    } else {
        // In production, only log server errors
        if (statusCode >= 500) {
            logger.error(`[${statusCode}] ${message}`);
        }
    }

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        ...(config.nodeEnv === 'development' && { stack: err.stack }),
    });
};

module.exports = errorHandler;
