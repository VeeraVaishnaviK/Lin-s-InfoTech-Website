const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        },
        projectType: {
            type: String,
            enum: {
                values: ['AI Development', 'Web Development', 'Mobile App', 'Automation', 'Other'],
                message: '{VALUE} is not a valid project type',
            },
            required: [true, 'Please specify a project type'],
        },
        budget: {
            type: String,
            trim: true,
        },
        timeline: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            required: [true, 'Please provide a message'],
            maxlength: [1000, 'Message cannot be more than 1000 characters'],
        },
        leadScore: {
            type: Number,
            default: 0,
            min: 0,
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'qualified', 'lost', 'converted'],
            default: 'new',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Lead', leadSchema);
