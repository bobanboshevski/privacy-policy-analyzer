const pdfAnalysisService = require('../services/pdfAnalysisService');
const urlAnalysisService = require('../services/urlAnalysisService');
const {
    analyzeWithPython,
    analyzeGdprWithPython,
    analyzeCcpaWithPython,
    analyzeWithPythonForFlagging
} = require("../services/externalPrivacyAnalysisService");
const {handlePdfAnalysis} = require("../../utils/helper");
const {computeOverallScore} = require("../../utils/metricScoring");
const {isPrivacyPolicy} = require('../../utils/privacyPolicyChecker.js');
const {summarizeText} = require("../services/claudeAiService");
const {saveAnalysisToFirestore} = require("../services/firestoreService");
const {InputType} = require("../../utils/InputType");

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
        const claudeSummary = await summarizeText(text);
        console.log("overall score:", overallScore);

        const userId = req.user?.uid || null;
        console.log("USER ID:", userId);
        const docId = await saveAnalysisToFirestore({
            inputType: InputType.TEXT,
            userId,
            originalInput: text.trim(),
            extractedText: text.trim(),
            nlpAnalysis: pythonAnalysisResult,
            overallScore,
            summary: claudeSummary[0].text
        });

        return res.status(200).json({
            success: true,
            data: {extractedText: text.trim()},
            summary: claudeSummary[0].text,
            nlpAnalysis: pythonAnalysisResult,
            overallScore: overallScore
        });
    } catch (error) {
        next(error);
    }
};


const analyzeTextFlagging = async (req, res, next) => {
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

        const flaggingAnalysisResult = await analyzeWithPythonForFlagging(text.trim());

        console.log("Text flagging root-analysis:", flaggingAnalysisResult);

        return res.status(200).json({
            success: true,
            data: {extractedText: text.trim()},
            flaggingAnalysis: flaggingAnalysisResult.flaggingAnalysis
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

        console.log("GDPR compliance root-analysis:", gdprAnalysisResult);

        return res.status(200).json({
            success: true,
            data: {extractedText: text.trim()},
            gdprCompliance: gdprAnalysisResult.gdprCompliance
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

        console.log("CCPA compliance root-analysis:", ccpaAnalysisResult);

        return res.status(200).json({
            success: true,
            data: {extractedText: text.trim()},
            ccpaCompliance: ccpaAnalysisResult.ccpaCompliance
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
                error: 'URL is required.',
            });
        }

        const result = await urlAnalysisService.analyze(url);
        console.log("URL scraped text: ", result);

        const pythonAnalysisResult = await analyzeWithPython(result.extractedText);
        const overallScore = computeOverallScore(pythonAnalysisResult);

        console.log(pythonAnalysisResult);
        console.log("Overall rating: ", overallScore);

        const claudeSummary = await summarizeText(result.extractedText);
        const userId = req.user?.uid || null;
        console.log("USER ID:", userId);

        const docId = await saveAnalysisToFirestore({
            inputType: InputType.URL,
            userId,
            originalInput: url,
            extractedText: result.extractedText,
            nlpAnalysis: pythonAnalysisResult,
            overallScore,
            summary: claudeSummary[0].text
        });

        return res.status(200).json({
            success: true,
            data: result,
            summary: claudeSummary[0].text,
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
 * Analyze GDPR compliance from a URL
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzeUrlGdprCompliance = async (req, res, next) => {
    try {
        const {url} = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                error: 'URL is required',
            });
        }

        const result = await urlAnalysisService.analyze(url);
        console.log("URL scraped text for GDPR root-analysis: ", result);

        if (!isPrivacyPolicy(result.extractedText)) {
            const error = new Error("Extracted text does not contain sufficient words or is not a privacy policy.");
            error.statusCode = 400;
            throw error;
        }

        const gdprAnalysisResult = await analyzeGdprWithPython(result.extractedText);

        console.log("URL GDPR compliance root-analysis:", gdprAnalysisResult);

        return res.status(200).json({
            success: true,
            data: result,
            gdprCompliance: gdprAnalysisResult.gdprCompliance
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Analyze CCPA compliance from a URL
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const analyzeUrlCcpaCompliance = async (req, res, next) => {
    try {
        const {url} = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                error: 'URL is required',
            });
        }

        const result = await urlAnalysisService.analyze(url);
        console.log("URL scraped text for CCPA root-analysis: ", result);

        if (!isPrivacyPolicy(result.extractedText)) {
            const error = new Error("Extracted text does not contain sufficient words or is not a privacy policy.");
            error.statusCode = 400;
            throw error;
        }

        const ccpaAnalysisResult = await analyzeCcpaWithPython(result.extractedText);

        console.log("URL CCPA compliance root-analysis:", ccpaAnalysisResult);

        return res.status(200).json({
            success: true,
            data: result,
            ccpaCompliance: ccpaAnalysisResult.ccpaCompliance
        });
    } catch (error) {
        next(error);
    }
};


const analyzeUrlFlagging = async (req, res, next) => {
    try {
        const {url} = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                error: 'URL is required',
            });
        }

        const result = await urlAnalysisService.analyze(url);
        console.log("URL scraped text for text-flagging root-analysis: ", result);

        if (!isPrivacyPolicy(result.extractedText)) {
            const error = new Error("Extracted text does not contain sufficient words or is not a privacy policy.");
            error.statusCode = 400;
            throw error;
        }

        const flaggingAnalysisResult = await analyzeWithPythonForFlagging(result.extractedText);

        console.log("URL text-flagging root-analysis:", flaggingAnalysisResult);

        return res.status(200).json({
            success: true,
            data: result,
            flaggingAnalysis: flaggingAnalysisResult.flaggingAnalysis
        });
    } catch (error) {
        next(error);
    }
};


/**
 * Helper function for PDF GDPR compliance root-analysis
 */
const handlePdfGdprCompliance = async (req, res, next, analyzeFunction) => {
    try {
        const result = await analyzeFunction(req.file);

        if (!result.extractedText || !isPrivacyPolicy(result.extractedText)) {
            const error = new Error("Extracted text does not contain sufficient words or is not a privacy policy.");
            error.statusCode = 400;
            throw error;
        }

        const gdprAnalysisResult = await analyzeGdprWithPython(result.extractedText);

        console.log("PDF GDPR compliance root-analysis:", gdprAnalysisResult);

        return res.status(200).json({
            success: true,
            data: result,
            gdprCompliance: gdprAnalysisResult.gdprCompliance
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Helper function for PDF CCPA compliance root-analysis
 */
const handlePdfCcpaCompliance = async (req, res, next, analyzeFunction) => {
    try {
        const result = await analyzeFunction(req.file);

        if (!result.extractedText || !isPrivacyPolicy(result.extractedText)) {
            const error = new Error("Extracted text does not contain sufficient words or is not a privacy policy.");
            error.statusCode = 400;
            throw error;
        }

        const ccpaAnalysisResult = await analyzeCcpaWithPython(result.extractedText);

        console.log("PDF CCPA compliance root-analysis:", ccpaAnalysisResult);

        return res.status(200).json({
            success: true,
            data: result,
            ccpaCompliance: ccpaAnalysisResult.ccpaCompliance
        });
    } catch (error) {
        next(error);
    }
};

const handlePdfTextFlagging = async (req, res, next, analyzeFunction) => {
    try {
        const result = await analyzeFunction(req.file);

        if (!result.extractedText || !isPrivacyPolicy(result.extractedText)) {
            const error = new Error("Extracted text does not contain sufficient words or is not a privacy policy.");
            error.statusCode = 400;
            throw error;
        }

        const flaggingAnalysisResult = await analyzeWithPythonForFlagging(result.extractedText);

        console.log("PDF text flagging root-analysis:", flaggingAnalysisResult);

        return res.status(200).json({
            success: true,
            data: result,
            flaggingAnalysis: flaggingAnalysisResult.flaggingAnalysis
        });
    } catch (error) {
        next(error);
    }
};

/**
 * PDF GDPR compliance root-analysis functions
 */
const analyzePdfTextFlagging = (req, res, next) => {
    return handlePdfTextFlagging(req, res, next, pdfAnalysisService.analyzeWithPdfParse);
};

const analyzePdf2JsonTextFlagging = (req, res, next) => {
    return handlePdfTextFlagging(req, res, next, pdfAnalysisService.analyzeWithPdf2Json);
};

const analyzePdfJsExtractTextFlagging = (req, res, next) => {
    return handlePdfTextFlagging(req, res, next, pdfAnalysisService.analyzeWithPdfJsExtract);
};

const analyzePdfGdprCompliance = (req, res, next) => {
    return handlePdfGdprCompliance(req, res, next, pdfAnalysisService.analyzeWithPdfParse);
};

const analyzePdf2JsonGdprCompliance = (req, res, next) => {
    return handlePdfGdprCompliance(req, res, next, pdfAnalysisService.analyzeWithPdf2Json);
};

const analyzePdfJsExtractGdprCompliance = (req, res, next) => {
    return handlePdfGdprCompliance(req, res, next, pdfAnalysisService.analyzeWithPdfJsExtract);
};


/**
 * PDF CCPA compliance root-analysis functions
 */
const analyzePdfCcpaCompliance = (req, res, next) => {
    return handlePdfCcpaCompliance(req, res, next, pdfAnalysisService.analyzeWithPdfParse);
};

const analyzePdf2JsonCcpaCompliance = (req, res, next) => {
    return handlePdfCcpaCompliance(req, res, next, pdfAnalysisService.analyzeWithPdf2Json);
};

const analyzePdfJsExtractCcpaCompliance = (req, res, next) => {
    return handlePdfCcpaCompliance(req, res, next, pdfAnalysisService.analyzeWithPdfJsExtract);
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
    analyzeTextFlagging,
    analyzeGdprCompliance,
    analyzeCcpaCompliance,
    analyzeUrlGdprCompliance,
    analyzeUrlCcpaCompliance,
    analyzeUrlFlagging,
    analyzeUrl,
    analyzePdfParser,
    analyzePdf2Json,
    analyzePdfJsExtract,
    analyzePdfGdprCompliance,
    analyzePdf2JsonGdprCompliance,
    analyzePdfJsExtractGdprCompliance,
    analyzePdfTextFlagging,
    analyzePdf2JsonTextFlagging,
    analyzePdfJsExtractTextFlagging,
    analyzePdfCcpaCompliance,
    analyzePdf2JsonCcpaCompliance,
    analyzePdfJsExtractCcpaCompliance
};