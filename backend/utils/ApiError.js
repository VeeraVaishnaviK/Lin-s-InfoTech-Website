/**
 * Custom API Error class.
 * Extends the native Error with statusCode and isOperational flag
 * for clean error handling throughout the application.
 */
class ApiError extends Error {
    /**
     * @param {number} statusCode - HTTP status code
     * @param {string} message - Error message
     * @param {boolean} [isOperational=true] - Whether the error is operational (expected)
     * @param {string} [stack] - Optional stack trace
     */
    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    /**
     * Factory: 400 Bad Request
     */
    static badRequest(message = 'Bad request') {
        return new ApiError(400, message);
    }

    /**
     * Factory: 401 Unauthorized
     */
    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, message);
    }

    /**
     * Factory: 403 Forbidden
     */
    static forbidden(message = 'Forbidden') {
        return new ApiError(403, message);
    }

    /**
     * Factory: 404 Not Found
     */
    static notFound(message = 'Resource not found') {
        return new ApiError(404, message);
    }

    /**
     * Factory: 500 Internal Server Error
     */
    static internal(message = 'Internal server error') {
        return new ApiError(500, message, false);
    }
}

module.exports = ApiError;
