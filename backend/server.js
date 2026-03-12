/**
 * Server entry point.
 * Loads environment variables, connects to MongoDB, and starts the Express server.
 * Includes graceful shutdown handling.
 */
const config = require('./config');
const connectDB = require('./config/db');
const app = require('./app');
const logger = require('./utils/logger');

// ---------------------------------------------------------------------------
// Start the server
// ---------------------------------------------------------------------------

const startServer = async () => {
    // Attempt to connect to MongoDB
    await connectDB();

    const server = app.listen(config.port, () => {
        logger.info(`
╔══════════════════════════════════════════════════╗
║         Lin's InfoTech — Backend API             ║
╠══════════════════════════════════════════════════╣
║  Status:      Running                            ║
║  Port:        ${String(config.port).padEnd(37)}║
║  Environment: ${String(config.nodeEnv).padEnd(37)}║
║  Health:      http://localhost:${config.port}/api/health${' '.repeat(Math.max(0, 14 - String(config.port).length))}║
╚══════════════════════════════════════════════════╝
    `);
    });

    // -------------------------------------------------------------------------
    // Graceful shutdown
    // -------------------------------------------------------------------------

    const shutdown = (signal) => {
        logger.info(`${signal} received. Shutting down gracefully...`);
        server.close(() => {
            logger.info('HTTP server closed');
            const mongoose = require('mongoose');
            mongoose.connection.close(false).then(() => {
                logger.info('MongoDB connection closed');
                process.exit(0);
            });
        });

        // Force shutdown after 10 seconds
        setTimeout(() => {
            logger.error('Forced shutdown — timeout exceeded');
            process.exit(1);
        }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
        logger.error(`Unhandled Rejection: ${err.message}`);
        shutdown('UNHANDLED_REJECTION');
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
        logger.error(`Uncaught Exception: ${err.message}`);
        shutdown('UNCAUGHT_EXCEPTION');
    });
};

startServer();
