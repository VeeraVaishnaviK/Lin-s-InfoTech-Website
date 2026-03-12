const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
    {
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Invoice must belong to a client'],
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: [true, 'Invoice must be associated with a project'],
        },
        amount: {
            type: Number,
            required: [true, 'Please provide an amount'],
            min: [0, 'Amount cannot be negative'],
        },
        items: [
            {
                description: { type: String, required: true },
                price: { type: Number, required: true },
            },
        ],
        status: {
            type: String,
            enum: ['paid', 'unpaid'],
            default: 'unpaid',
        },
        dueDate: {
            type: Date,
            required: [true, 'Please specify a due date'],
        },
        pdfUrl: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Invoice', invoiceSchema);
