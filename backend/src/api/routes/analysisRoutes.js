const express = require('express');
const analysisController = require('../controllers/analysisController');
const requestRestrictions = require('./../../utils/requestRestrictions')
const {sendTextToPython} = require("../services/pdfAnalysisService");
const verifyFirebaseToken = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/analyze/text:
 *   post:
 *     summary: Analyze text
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Analysis result
 */
router.post('/text', analysisController.analyzeText);

router.post('/pdf/pdf-parse', requestRestrictions.enforceFileOnly, analysisController.analyzePdfParser);
router.post('/pdf/pdf-2-json', requestRestrictions.enforceFileOnly, analysisController.analyzePdf2Json);
router.post('/pdf/pdf-js-extract', requestRestrictions.enforceFileOnly, analysisController.analyzePdfJsExtract);


router.post('/url/scrape', analysisController.analyzeUrl);


router.post('/test-fastapi', async (req, res) => {
    try {
        const { text } = req.body;
        const result = await sendTextToPython(text);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Python service failed' });
    }
});

/* CHECKING IF FIREBASE IS WORKING */
router.get('/secure-analysis', verifyFirebaseToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});


module.exports = router;