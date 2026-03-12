const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        },
        date: {
            type: Date,
            required: [true, 'Please select a date'],
        },
        time: {
            type: String,
            required: [true, 'Please select a time slot'],
            trim: true,
        },
        projectType: {
            type: String,
            trim: true,
        },
        notes: {
            type: String,
            maxlength: [500, 'Notes cannot be more than 500 characters'],
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'completed', 'cancelled'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Consultation', consultationSchema);
