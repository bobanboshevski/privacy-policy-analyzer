const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const analysisRoutes = require('./analysisRoutes');
const exportRoutes = require('./../routes/exportRoutes');
const policyRoutes = require('./../routes/policyRoutes');
const trainingRoutes = require('./educationRoutes');
const feedbackRoutes = require('./feedbackRoutes');

router.use('/analyze', analysisRoutes);
router.use('/export', exportRoutes);
router.use('/policies', policyRoutes);
router.use('/education', trainingRoutes);
router.use('/feedback', feedbackRoutes);

module.exports = router;