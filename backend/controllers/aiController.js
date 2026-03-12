const axios = require('axios');
const config = require('../config');
const ApiError = require('../utils/ApiError');

// Axios instance for AI services
const aiClient = axios.create({
    baseURL: config.aiServicesUrl,
    timeout: 30000, // 30 seconds for AI processing
});

/**
 * Proxy request to Python AI services
 */
const proxyToAI = async (endpoint, req, res, next) => {
    try {
        const response = await aiClient.post(endpoint, req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        if (err.response) {
            // Forward the error from AI service
            return next(new ApiError(err.response.status, err.response.data.detail || 'AI Service Error'));
        }
        next(err);
    }
};

exports.chatbot = (req, res, next) => proxyToAI('/api/ai/chatbot', req, res, next);
exports.estimator = (req, res, next) => proxyToAI('/api/ai/estimator', req, res, next);
exports.proposal = (req, res, next) => proxyToAI('/api/ai/proposal', req, res, next);
exports.analyzer = (req, res, next) => proxyToAI('/api/ai/analyzer', req, res, next);
exports.validator = (req, res, next) => proxyToAI('/api/ai/validator', req, res, next);
