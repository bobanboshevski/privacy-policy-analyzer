const {analyzeWithPython} = require("../api/services/externalPrivacyAnalysisService");
const {computeOverallScore} = require("./metricScoring");
const {saveAnalysisToFirestore, uploadPdfAndGetPath} = require("../api/services/firestoreService");
const {InputType} = require("../utils/InputType");
const {getStorage} = require("firebase-admin/storage");
const {summarizeText} = require("../api/services/claudeAiService");

/**
 * Common PDF root-analysis logic
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 * @param {Function} analysisFunction - Function to extract text from PDF
 */
const handlePdfAnalysis = async (req, res, next, analysisFunction) => {
    try {
        if (!req.file) {
            const error = new Error("PDF file is required");
            error.statusCode = 403;
            throw error;
        }

        const analysisResult = await analysisFunction(req.file);
        const claudeSummary = await summarizeText(analysisResult.extractedText);
        console.log("AI summary: ", claudeSummary);
        const pythonAnalysisResult = await analyzeWithPython(analysisResult.extractedText);
        console.log("Python root-analysis: ", pythonAnalysisResult);

        const overallScore = computeOverallScore(pythonAnalysisResult);
        console.log("Overall rating: ", overallScore);

        const userId = req.user?.uid || null;
        console.log("USER ID:", userId);

        const pdfPath = await uploadPdfAndGetPath(req.file); // Returns path like 'pdfs/123_x.pdf'

        const docId = await saveAnalysisToFirestore({
            inputType: InputType.PDF,
            userId,
            originalInput: pdfPath,
            extractedText: analysisResult.extractedText,
            nlpAnalysis: pythonAnalysisResult,
            overallScore,
            summary: claudeSummary
        });

        return res.status(200).json({
            success: true,
            data: analysisResult,
            summary: claudeSummary[0].text,
            nlpAnalysis: pythonAnalysisResult,
            overallScore: overallScore
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handlePdfAnalysis
};