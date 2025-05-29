const axios = require('axios');
const {post} = require("axios");
require('dotenv').config();

const baseURL = process.env.PYTHON_NLP_URL

/**
 * Calls the Python NLP module for analysis
 * @param {string} text - Text content to analyze
 * @returns {Promise<Object>} - Analysis result from the Python module
 */
const analyzeWithPython = async (text) => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/analyze/text`, {
            text
        });
        return response.data;
    } catch (error) {
        console.error('Error calling Python service:', error.message);
        throw new Error('Failed to analyze text via Python service');
    }
};
/**
 * Send text to Python GDPR compliance analysis service
 * @param {string} text - Text to analyze
 * @returns {Promise<Object>} GDPR compliance analysis result
 */
const analyzeGdprWithPython = async (text) => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/analyze/gdpr`, {
            text: text
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000 // 30 seconds timeout
        });

        return response.data;
    } catch (error) {
        console.error('Error calling Python GDPR analysis service:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw new Error('Python GDPR analysis service failed');
    }
};

/**
 * Send text to Python CCPA compliance analysis service
 * @param {string} text - Text to analyze
 * @returns {Promise<Object>} CCPA compliance analysis result
 */
const analyzeCcpaWithPython = async (text) => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/analyze/ccpa`, {
            text: text
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000 // 30 seconds timeout
        });

        return response.data;
    } catch (error) {
        console.error('Error calling Python CCPA analysis service:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw new Error('Python CCPA analysis service failed');
    }
};

module.exports = {
    analyzeWithPython,
    analyzeGdprWithPython,
    analyzeCcpaWithPython
};