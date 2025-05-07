const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./../config/environment');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API endpoints for the backend services',
        },
        servers: [
            {
                url: config.URL, //'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/api/routes/*.js'], // Where to look for annotation
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;