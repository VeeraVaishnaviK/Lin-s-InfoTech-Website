/**
 * MongoDB connection via Mongoose.
 * Handles connection events and logs status.
 */
const mongoose = require('mongoose');
const config = require('./index');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongodbUri);

        logger.info(`MongoDB connected: ${conn.connection.host}`);

        // Connection event handlers
        mongoose.connection.on('error', (err) => {
            logger.error(`MongoDB connection error: ${err.message}`);
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected');
        });

        return conn;
    } catch (error) {
        logger.error(`MongoDB connection failed: ${error.message}`);
        // Don't exit process — let the server run without DB for health checks
        // The health endpoint will report the DB as disconnected
    }
};

module.exports = connectDB;
