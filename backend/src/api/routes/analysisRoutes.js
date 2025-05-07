const express = require('express');
const analysisController = require('../controllers/analysisController');

const router = express.Router();

// Text analysis routes
router.post('/text', analysisController.analyzeText);

// URL analysis routes
// router.post('/url', analysisController.analyzeUrl);

// PDF analysis routes
// router.post('/pdf', analysisController.analyzePdf);

module.exports = router;