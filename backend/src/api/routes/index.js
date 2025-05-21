const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const analysisRoutes = require('./analysisRoutes');
const exportRoutes = require('./../routes/exportRoutes');


router.use('/analyze', analysisRoutes);
router.use('/export', exportRoutes);
module.exports = router;