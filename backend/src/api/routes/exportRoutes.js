const express = require('express');
const exportController = require("../controllers/exportController");
const router = express.Router();

router.post('/pdf', exportController.exportPdf);


module.exports = router;