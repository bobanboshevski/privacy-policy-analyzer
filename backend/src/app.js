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

app.get('/', (req, res) => {
    res.send('Privacy Policy Analyzer API is running');
});

setupSwagger(app);

// Error handling middleware
app.use(errorHandler);

module.exports = app;