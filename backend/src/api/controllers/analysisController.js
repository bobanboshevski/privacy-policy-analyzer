const pdfAnalysisService = require('../services/pdfAnalysisService');
const urlAnalysisService = require('../services/urlAnalysisService');
const {analyzeWithPython} = require("../services/externalPrivacyAnalysisService");
const {handlePdfAnalysis} = require("../../utils/helper");
const {computeOverallScore} = require("../../utils/metricScoring");
const {saveAnalysisToFirestore} = require("../services/firestoreService");
const {InputType} = require("../../utils/InputType");
/**
 * Analyze text content of a privacy policy
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

        // const claudeSummary = await summarizeText(text.trim());
        // console.log("AI summary: ",claudeSummary);

        const pythonAnalysisResult = await analyzeWithPython(text.trim());

        const overallScore = computeOverallScore(pythonAnalysisResult);
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
            summary: "Temporary summary placeholder"
        });

        return res.status(200).json({
                success: true,
                data: {extractedText: text.trim()},
                summary: "This is temporary message",
                nlpAnalysis: pythonAnalysisResult,
                overallScore: overallScore
            }
        );
    } catch
        (error) {
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

        const userId = req.user?.uid || null;
        console.log("USER ID:", userId);

        const docId = await saveAnalysisToFirestore({
            inputType: InputType.URL,
            userId,
            originalInput: url,
            extractedText: result.extractedText,
            nlpAnalysis: pythonAnalysisResult,
            overallScore,
            summary: "Summary placeholder"
        });

        return res.status(200).json({
            success: true,
            data: result, //...result,
            summary: "That part of the code is commented out!", // claudeSummary[0].text,
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
    analyzeUrl,
    analyzePdfParser,
    analyzePdf2Json,
    analyzePdfJsExtract
};