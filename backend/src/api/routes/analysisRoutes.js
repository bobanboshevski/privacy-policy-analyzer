const express = require('express');
const analysisController = require('../controllers/analysisController');
const requestRestrictions = require('./../../utils/requestRestrictions')
const {sendTextToPython} = require("../services/pdfAnalysisService");
const {verifyFirebaseTokenStrict, verifyFirebaseTokenOptional} = require("../middlewares/authMiddleware");
const {getSignedUrlFromPath} = require("../services/firestoreService");
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
router.post('/text', verifyFirebaseTokenOptional, analysisController.analyzeText);

router.post('/pdf/pdf-parse', verifyFirebaseTokenOptional, requestRestrictions.enforceFileOnly, analysisController.analyzePdfParser);
router.post('/pdf/pdf-2-json', requestRestrictions.enforceFileOnly, analysisController.analyzePdf2Json);
router.post('/pdf/pdf-js-extract', requestRestrictions.enforceFileOnly, analysisController.analyzePdfJsExtract);

router.post('/url/scrape', verifyFirebaseTokenOptional, analysisController.analyzeUrl);

router.post('/test-fastapi', async (req, res) => {
    try {
        const {text} = req.body;
        const result = await sendTextToPython(text);
        res.json(result);
    } catch (err) {
        res.status(500).json({error: 'Python service failed'});
    }
});

/* CHECKING IF FIREBASE IS WORKING */
router.get('/secure-analysis', verifyFirebaseTokenStrict, (req, res) => {
    res.json({message: 'Access granted', user: req.user});
});

// ONLY FOR TESTING PURPOSES TO CHECK IF FIREBASE STORAGE IS WORKING
router.get('/pdf-url', verifyFirebaseTokenStrict, async (req, res) => {
    const path = req.query.path;
    if (!path) {
        return res.status(400).json({error: 'Missing "path" query parameter'});
    }
    try {
        const signedUrl = await getSignedUrlFromPath(path);
        res.json({signedUrl});
    } catch (err) {
        console.error('Error generating signed URL:', err);
        res.status(500).json({error: 'Failed to generate signed URL'});
    }
});

module.exports = router;