
const pdfAnalysisService = require('../services/pdfAnalysisService');
const urlAnalysisService = require('../services/urlAnalysisService');
const {analyzeWithPython, analyzeGdprWithPython, analyzeCcpaWithPython} = require("../services/externalPrivacyAnalysisService");
const {handlePdfAnalysis} = require("../../utils/helper");
const {computeOverallScore} = require("../../utils/metricScoring");
const { isPrivacyPolicy } = require('../../utils/privacyPolicyChecker.js');

/**
 * Analyze text content of a privacy policy (without compliance metrics)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzeText = async (req, res, next) => {
    try {
        const {text} = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Text content is required'
            });
        }

        if (!isPrivacyPolicy(text)) {
            const error = new Error("Text does not contain sufficient words or is not a privacy policy.");
            error.statusCode = 400;
            throw error;
        }

        const pythonAnalysisResult = await analyzeWithPython(text.trim());
        const overallScore = computeOverallScore(pythonAnalysisResult);
        
        console.log("overall score:", overallScore);

        return res.status(200).json({
            success: true,
            data: {extractedText: text.trim()},
            summary: "This is temporary message",
            nlpAnalysis: pythonAnalysisResult,
            overallScore: overallScore
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Analyze GDPR compliance for text/document/URL
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzeGdprCompliance = async (req, res, next) => {
    try {
        const {text} = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Text content is required'
            });
        }

        if (!isPrivacyPolicy(text)) {
            const error = new Error("Text does not contain sufficient words or is not a privacy policy.");
            error.statusCode = 400;
            throw error;
        }

        const gdprAnalysisResult = await analyzeGdprWithPython(text.trim());
        
        console.log("GDPR compliance analysis:", gdprAnalysisResult);

        return res.status(200).json({
            success: true,
            data: {extractedText: text.trim()},
            gdprCompliance: gdprAnalysisResult
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Analyze CCPA compliance for text/document/URL
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzeCcpaCompliance = async (req, res, next) => {
    try {
        const {text} = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Text content is required'
            });
        }

        if (!isPrivacyPolicy(text)) {
            const error = new Error("Text does not contain sufficient words or is not a privacy policy.");
            error.statusCode = 400;
            throw error;
        }

        const ccpaAnalysisResult = await analyzeCcpaWithPython(text.trim());
        
        console.log("CCPA compliance analysis:", ccpaAnalysisResult);

        return res.status(200).json({
            success: true,
            data: {extractedText: text.trim()},
            ccpaCompliance: ccpaAnalysisResult
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Analyze privacy policy from a URL (without compliance metrics)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzeUrl = async (req, res, next) => {
    try {
        const {url} = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                error: 'URL is required',
            });
        }

        const result = await urlAnalysisService.analyze(url);
        console.log("URL scraped text: ", result);

        const pythonAnalysisResult = await analyzeWithPython(result.extractedText);
        const overallScore = computeOverallScore(pythonAnalysisResult);
        
        console.log(pythonAnalysisResult);
        console.log("Overall rating: ", overallScore);

        return res.status(200).json({
            success: true,
            data: result,
            summary: "That part of the code is commented out!",
            nlpAnalysis: pythonAnalysisResult,
            overallScore: overallScore
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
const analyzePdfParser = (req, res, next) => {
    return handlePdfAnalysis(req, res, next, pdfAnalysisService.analyzeWithPdfParse);
};

/**
 * Analyze privacy policy from a PDF file
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzePdf2Json = (req, res, next) => {
    return handlePdfAnalysis(req, res, next, pdfAnalysisService.analyzeWithPdf2Json);
};

/**
 * Analyze privacy policy from a PDF file
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzePdfJsExtract = (req, res, next) => {
    return handlePdfAnalysis(req, res, next, pdfAnalysisService.analyzeWithPdfJsExtract);
}

module.exports = {
    analyzeText,
    analyzeGdprCompliance,
    analyzeCcpaCompliance,
    analyzeUrl,
    analyzePdfParser,
    analyzePdf2Json,
    analyzePdfJsExtract
};