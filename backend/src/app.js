const express = require('express');
const cors = require('cors');
const routes = require('./api/routes/index');
const errorHandler = require('./api/middlewares/errorHandler');
const requestLogger = require('./api/middlewares/requestLogger');
const setupSwagger = require('./config/swagger');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const config = require('./config/environment')
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: config.ALLOWED_ORIGINS
}));

// Request logging
app.use(requestLogger);

// API Routes
app.use('/api', routes);

// Basic health check route
app.get('/', (req, res) => {
    res.send('Privacy Policy Analyzer API is running');
});

// app.use((err, req, res, next) => {
//     console.error('Error:', err);
//     res.status(500).json({
//         success: false,
//         error: err.message || 'Internal server error'
//     });
// });

setupSwagger(app);

// Error handling middleware (should be last)
app.use(errorHandler);

module.exports = app;