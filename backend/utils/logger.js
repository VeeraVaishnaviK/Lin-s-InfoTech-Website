/**
 * Simple console logger with coloured output.
 * Provides info, warn, error, and debug methods.
 */
const logger = {
    /**
     * Log informational messages (green)
     */
    info: (...args) => {
        console.log('\x1b[32m[INFO]\x1b[0m', new Date().toISOString(), ...args);
    },

    /**
     * Log warning messages (yellow)
     */
    warn: (...args) => {
        console.warn('\x1b[33m[WARN]\x1b[0m', new Date().toISOString(), ...args);
    },

    /**
     * Log error messages (red)
     */
    error: (...args) => {
        console.error('\x1b[31m[ERROR]\x1b[0m', new Date().toISOString(), ...args);
    },

    /**
     * Log debug messages (cyan) — only in development
     */
    debug: (...args) => {
        if (process.env.NODE_ENV !== 'production') {
            console.log('\x1b[36m[DEBUG]\x1b[0m', new Date().toISOString(), ...args);
        }
    },
};

module.exports = logger;
