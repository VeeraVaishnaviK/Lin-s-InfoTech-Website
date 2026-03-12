const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Sign 15-minute access token (stored in memory/app state)
 */
const signAccessToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: config.jwtAccessExpiry,
    });
};

/**
 * Sign 7-day refresh token (stored in HTTP-only cookie)
 */
const signRefreshToken = (id) => {
    return jwt.sign({ id }, config.jwtRefreshSecret, {
        expiresIn: config.jwtRefreshExpiry,
    });
};

/**
 * Verify JWT token
 */
const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyToken,
};
