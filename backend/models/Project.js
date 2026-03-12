const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a project title'],
            trim: true,
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'A project must belong to a client'],
        },
        status: {
            type: String,
            enum: {
                values: ['Requirement', 'Design', 'Development', 'Testing', 'Deployment'],
                message: '{VALUE} is not a valid project status',
            },
            default: 'Requirement',
        },
        updates: [
            {
                message: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Project', projectSchema);
