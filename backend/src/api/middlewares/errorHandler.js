/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const errorHandler = (err, req, res, next) => {

    // Default error status and message
    const status = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: message
        });
    }

    // Handle file/upload errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
            success: false,
            error: 'File too large'
        });
    }

    // Handle unauthorized errors
    if (status === 401) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized'
        });
    }

    // Handle not found errors
    if (status === 404) {
        return res.status(404).json({
            success: false,
            error: 'Resource not found'
        });
    }

    // Default error response
    return res.status(status).json({
        success: false,
        error: message
    });
};

module.exports = errorHandler;