const axios = require('axios');
const {post} = require("axios");
require('dotenv').config();

const baseURL = process.env.PYTHON_NLP_URL

/**
 * Calls the Python NLP module for root-analysis
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
 * Send text to Python GDPR compliance root-analysis service
 * @param {string} text - Text to analyze
 * @returns {Promise<Object>} GDPR compliance root-analysis result
 */
const analyzeGdprWithPython = async (text) => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/analyze/gdpr`, {
            text: text
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 60000
        });

        return response.data;
    } catch (error) {
        console.error('Error calling Python GDPR root-analysis service:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw new Error('Python GDPR root-analysis service failed');
    }
};

/**
 * Send text to Python CCPA compliance root-analysis service
 * @param {string} text - Text to analyze
 * @returns {Promise<Object>} CCPA compliance root-analysis result
 */
const analyzeCcpaWithPython = async (text) => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/analyze/ccpa`, {
            text: text
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 60000
        });

        return response.data;
    } catch (error) {
        console.error('Error calling Python CCPA root-analysis service:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw new Error('Python CCPA root-analysis service failed');
    }
};


const analyzeWithPythonForFlagging = async (text) => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/analyze/text/flagging`, {
            text: text
        },{
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 60000
        });
        
        return response.data;
    } catch (error) {
        console.error('Error calling Python Flagging root-analysis service:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw new Error('Python Flagging root-analysis service failed');
    }
};


module.exports = {
    analyzeWithPython,
    analyzeGdprWithPython,
    analyzeCcpaWithPython,
    analyzeWithPythonForFlagging
};