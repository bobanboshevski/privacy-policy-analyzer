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

module.exports = {
    analyzeWithPython
};
