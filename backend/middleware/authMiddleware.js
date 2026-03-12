const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const config = require('../config');

/**
 * Protection middleware: Protect routes from unauthorized access
 */
exports.protect = async (req, res, next) => {
    try {
        // 1. Getting token and check if it's there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(ApiError.unauthorized('You are not logged in. Please log in to get access.'));
        }

        // 2. Verification token
        const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

        // 3. Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(ApiError.unauthorized('The user belonging to this token no longer exists.'));
        }

        // 4. Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next(ApiError.unauthorized('User recently changed password! Please log in again.'));
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        next();
    } catch (err) {
        return next(ApiError.unauthorized('Invalid token. Please log in again.'));
    }
};

/**
 * RBAC middleware: Restrict access to specific roles
 */
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'client']
        if (!roles.includes(req.user.role)) {
            return next(ApiError.forbidden('You do not have permission to perform this action'));
        }
        next();
    };
};
