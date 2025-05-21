const {analyzeWithPython} = require("../api/services/externalPrivacyAnalysisService");

/**
 * Common PDF analysis logic
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware
 * @param {Function} analysisFunction - Function to extract text from PDF
 */
const handlePdfAnalysis = async (req, res, next, analysisFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'PDF file is required'
            });
        }

        const analysisResult = await analysisFunction(req.file);
        // const claudeSummary = await summarizeText(analysisResult.extractedText);
        // console.log("AI summary: ",claudeSummary);
        const pythonAnalysisResult = await analyzeWithPython(analysisResult.extractedText);
        console.log("Python analysis: ", pythonAnalysisResult);

        const overallScore = computeOverallScore(pythonAnalysisResult);
        console.log("Overall rating: ", overallScore);

        return res.status(200).json({
            success: true,
            data: analysisResult,
            summary: "That part of the code is commented out! Here will be the claude summary, which is commented out.", // claudeSummary
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