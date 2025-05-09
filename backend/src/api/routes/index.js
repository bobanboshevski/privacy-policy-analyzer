const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const analysisRoutes = require('./analysisRoutes');

router.use('/analyze', analysisRoutes);

module.exports = router;