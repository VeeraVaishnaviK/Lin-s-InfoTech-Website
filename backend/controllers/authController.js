const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { signAccessToken, signRefreshToken, verifyToken } = require('../utils/jwtUtils');
const config = require('../config');

/**
 * Helper: Send tokens and user data via response and cookie
 */
const sendResponseWithTokens = (user, statusCode, res) => {
    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    // Set refresh token in HTTP-only cookie
    const cookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: config.nodeEnv === 'production', // Use Secure flag in production (HTTPS)
        sameSite: config.nodeEnv === 'production' ? 'None' : 'Lax',
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        success: true,
        accessToken,
        data: {
            user,
        },
    });
};

/**
 * POST /api/auth/register
 */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(ApiError.badRequest('Email already in use'));
        }

        // Create user (role restricted by client-portal/admin logic later, default client)
        const newUser = await User.create({
            name,
            email,
            password,
            role: role || 'client',
        });

        sendResponseWithTokens(newUser, 201, res);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/auth/login
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Check if email and password exist
        if (!email || !password) {
            return next(ApiError.badRequest('Please provide email and password'));
        }

        // 2. Find user & select password
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password, user.password))) {
            return next(ApiError.unauthorized('Incorrect email or password'));
        }

        // 3. Send response
        sendResponseWithTokens(user, 200, res);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/auth/refresh
 */
exports.refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return next(ApiError.unauthorized('No refresh token provided'));
        }

        // Verify token
        let decoded;
        try {
            decoded = verifyToken(refreshToken, config.jwtRefreshSecret);
        } catch (err) {
            return next(ApiError.unauthorized('Invalid or expired refresh token'));
        }

        // Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(ApiError.unauthorized('User no longer exists'));
        }

        // Check if password was changed after token issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next(ApiError.unauthorized('Password recently changed. Please log in again.'));
        }

        // Issue new access token
        const accessToken = signAccessToken(currentUser._id);

        res.status(200).json({
            success: true,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/auth/logout
 */
exports.logout = (req, res) => {
    res.cookie('refreshToken', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000), // 10 seconds
        httpOnly: true,
    });
    res.status(200).json({ success: true, message: 'Logged out' });
};

/**
 * GET /api/auth/me
 * Returns current user data
 */
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (err) {
        next(err);
    }
};
