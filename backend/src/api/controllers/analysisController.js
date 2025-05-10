const textAnalysisService = require('../services/textAnalysisService');
const pdfAnalysisService = require('../services/pdfAnalysisService');
const urlAnalysisService = require('../services/urlAnalysisService');

/**
 * Analyze text content of a privacy policy
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzeText = async (req, res, next) => {
    try {
        // const { text } = req.body;
        //
        // if (!text || text.trim() === '') {
        //     return res.status(400).json({
        //         success: false,
        //         error: 'Text content is required'
        //     });
        // }
        //
        // const analysisResult = await textAnalysisService.analyze(text);

        return res.status(200).json({
            success: true,
            data: 'Documentation test' // analysisResult
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Analyze privacy policy from a URL
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzeUrl = async (req, res, next) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                error: 'URL is required',
            });
        }

        const result = await urlAnalysisService.analyze(url);

        return res.status(200).json({
            success: true,
            ...result, // contains paragraphs
        });
    } catch (error) {
        next(error);
    }
};



/**
 * Analyze privacy policy from a PDF file
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzePdf = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'PDF file is required'
            });
        }

        const analysisResult = await pdfAnalysisService.analyze(req.file);
        return res.status(200).json({
            success: true,
            data: analysisResult
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    analyzeText,
    analyzeUrl,
    analyzePdf
};