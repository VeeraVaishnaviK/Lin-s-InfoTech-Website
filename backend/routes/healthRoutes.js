/**
 * Health check route.
 * Returns server status, uptime, timestamp, and MongoDB connection state.
 */
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

/**
 * GET /api/health
 * Public endpoint — no authentication required.
 */
router.get('/', (req, res) => {
    const mongoState = mongoose.connection.readyState;
    const mongoStates = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };

    res.status(200).json({
        success: true,
        status: 'ok',
        uptime: `${Math.floor(process.uptime())}s`,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        mongodb: mongoStates[mongoState] || 'unknown',
    });
});

module.exports = router;
