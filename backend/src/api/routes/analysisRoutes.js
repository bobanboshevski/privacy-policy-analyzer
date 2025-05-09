const express = require('express');
const analysisController = require('../controllers/analysisController');
const requestRestrictions = require('./../../utils/requestRestrictions')
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

// URL analysis routes
// router.post('/url/scrape', analysisController.analyzeUrl);

router.post('/pdf/pdf-parse', requestRestrictions.enforceFileOnly, analysisController.analyzePdf);

module.exports = router;