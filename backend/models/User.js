const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxlength: [50, 'Name cannot be more than 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: {
                values: ['admin', 'client'],
                message: '{VALUE} is not a valid role',
            },
            default: 'client',
        },
        passwordChangedAt: Date,
    },
    {
        timestamps: true,
    }
);

/**
 * Middleware: Hash password before saving
 */
userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Update passwordChangedAt if the user isn't new
    if (!this.isNew) {
        this.passwordChangedAt = Date.now() - 1000;
    }
    next();
});

/**
 * Instance Method: Compare input password with hashed password in DB
 */
userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

/**
 * Instance Method: Check if password was changed after JWT was issued
 */
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    // False means NOT changed
    return false;
};

module.exports = mongoose.model('User', userSchema);
