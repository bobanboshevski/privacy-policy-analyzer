const express = require('express');
const analysisController = require('../controllers/analysisController');

const router = express.Router();

/**
 * @swagger
 * /api/analyze/text:
 *   post:
 *     summary: Analyze text or a URL
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
// Text analysis routes
router.post('/text', analysisController.analyzeText);

// URL analysis routes
// router.post('/url', analysisController.analyzeUrl);

// PDF analysis routes
// router.post('/pdf', analysisController.analyzePdf);

module.exports = router;