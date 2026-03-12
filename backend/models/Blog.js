const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a blog title'],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, 'Slug is required'],
            unique: true,
            lowercase: true,
        },
        content: {
            type: String,
            required: [true, 'Blog content is required'],
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'A blog must have an author'],
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        publishedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Auto-populate author name if needed
blogSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'author',
        select: 'name role',
    });
    next();
});

module.exports = mongoose.model('Blog', blogSchema);
