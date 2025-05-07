const express = require('express');
const router = express.Router();
const analysisRoutes = require('./analysisRoutes');

// Mount routes
router.use('/analyze', analysisRoutes);

// Add more routes as needed
// router.use('/users', userRoutes);

module.exports = router;