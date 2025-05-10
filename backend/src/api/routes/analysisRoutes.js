const express = require('express');
const analysisController = require('../controllers/analysisController');
const requestRestrictions = require('./../../utils/requestRestrictions')
const {sendTextToPython} = require("../services/pdfAnalysisService");
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

router.post('/pdf/pdf-parse', requestRestrictions.enforceFileOnly, analysisController.analyzePdf);

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


module.exports = router;