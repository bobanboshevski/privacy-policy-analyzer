/**
 * Middleware to log incoming requests
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const requestLogger = (req, res, next) => {
    const start = Date.now();

    // Log request details
    console.log("Start: ",`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

    // Log request body for debugging (remove in production or sanitize sensitive data)
    if (req.method !== 'GET' && process.env.NODE_ENV === 'development') {
        console.log('Request Body:', JSON.stringify(req.body));
    }

    // Log response time on response finish
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log("Finish: ",`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });

    next();
};

module.exports = requestLogger;