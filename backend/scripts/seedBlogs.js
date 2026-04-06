const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Blog = require('../models/Blog');
const User = require('../models/User');

const seedData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');

        // 1. Create a dummy user (author)
        let user = await User.findOne({ email: 'admin@linsinfotech.com' });
        if (!user) {
            user = await User.create({
                name: 'Lin Admin',
                email: 'admin@linsinfotech.com',
                password: 'password123',
                role: 'admin'
            });
            console.log('Created admin user');
        }

        // 2. Create some dummy blogs
        const blogCount = await Blog.countDocuments();
        if (blogCount === 0) {
            await Blog.create([
                {
                    title: 'The Future of AI in Modern Business',
                    slug: 'future-of-ai',
                    content: 'Exploring how AI is transforming workflows...',
                    excerpt: 'AI is no longer just a buzzword; it is a fundamental shift in how we operate.',
                    author: user._id,
                    status: 'published',
                    publishedAt: new Date()
                },
                {
                    title: 'Automating Your Creative Process',
                    slug: 'automating-creativity',
                    content: 'How generative AI is helping creators...',
                    excerpt: 'Generative AI is a co-pilot for the modern creative professional.',
                    author: user._id,
                    status: 'published',
                    publishedAt: new Date()
                }
            ]);
            console.log('Created dummy blog posts');
        } else {
            console.log('Blog posts already exist');
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedData();
