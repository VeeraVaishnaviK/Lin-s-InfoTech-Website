/**
 * 404 Not Found middleware.
 * Catches requests to undefined routes and returns a JSON response.
 */
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
};

module.exports = notFound;
