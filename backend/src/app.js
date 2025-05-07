const express = require('express');
const cors = require('cors');
const routes = require('./api/routes/index');
const errorHandler = require('./api/middlewares/errorHandler');
const requestLogger = require('./api/middlewares/requestLogger');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://privacy-policy-analyzer-xi.vercel.app'
    ]
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

// Error handling middleware (should be last)
app.use(errorHandler);

module.exports = app;