const textAnalysisService = require('../services/textAnalysisService');
// const urlAnalysisService = require('../services/urlAnalysisService');
// const pdfAnalysisService = require('../services/pdfAnalysisService');

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

// /**
//  * Analyze privacy policy from a URL
//  * @param {Object} req - Request object
//  * @param {Object} res - Response object
//  * @param {Function} next - Next middleware function
//  */
const analyzeUrl = async (req, res, next) => {
    try {
        const url = 'https://discord.com/privacy';
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const paragraphs = [];
        $('p').each((i, el) => {
            paragraphs.push($(el).text());
        });

        console.log('Scraped paragraphs:', paragraphs);

        res.json({ success: true, paragraphs });
    } catch (error) {
        next(error);
    }
};


// /**
//  * Analyze privacy policy from a PDF file
//  * @param {Object} req - Request object
//  * @param {Object} res - Response object
//  * @param {Function} next - Next middleware function
//  */
// const analyzePdf = async (req, res, next) => {
//     try {
//         // Assuming file upload is handled by a middleware
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'PDF file is required'
//             });
//         }
//
//         const analysisResult = await pdfAnalysisService.analyze(req.file);
//
//         return res.status(200).json({
//             success: true,
//             data: analysisResult
//         });
//     } catch (error) {
//         next(error);
//     }
// };

module.exports = {
    analyzeText,
    analyzeUrl
    // analyzePdf
};