/**
 * Express application setup.
 * Configures all middleware and mounts routes.
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const config = require('./config');
const { generalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const blogRoutes = require('./routes/blogRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// ---------------------------------------------------------------------------
// Security middleware
// ---------------------------------------------------------------------------

// Set security HTTP headers
app.use(helmet());

// Enable CORS for the frontend origin
app.use(
    cors({
        origin: config.corsOrigin,
        credentials: true, // Allow cookies (JWT refresh tokens)
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// ---------------------------------------------------------------------------
// Request parsing
// ---------------------------------------------------------------------------

// Parse JSON request bodies (limit to 10MB)
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Parse cookies
app.use(cookieParser());

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------

// HTTP request logging — 'dev' format in development, 'combined' in production
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------

// Apply general rate limiter to all /api routes
app.use('/api', generalLimiter);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// Health check (not rate-limited so monitoring tools can hit it freely)
app.use('/api/health', healthRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// Other API routes
app.use('/api/leads', leadRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/ai', aiRoutes);

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

// Catch undefined routes
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
