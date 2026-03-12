/**
 * Centralized configuration object.
 * All environment variables are read here with sensible defaults.
 */
require('dotenv').config();

const config = {
  // Server
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // MongoDB
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/lins-infotech',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'dev_jwt_secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dev_jwt_refresh_secret',
  jwtAccessExpiry: '15m',
  jwtRefreshExpiry: '7d',

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // AI Services
  aiServicesUrl: process.env.AI_SERVICES_URL || 'http://localhost:8000',

  // Rate Limiting
  rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100, // requests per window
};

module.exports = config;
