const express = require('express');
const {verifyFirebaseTokenStrict} = require("../middlewares/authMiddleware");
const trainingController = require("../controllers/educationController");
const router = express.Router();


router.get("/", verifyFirebaseTokenStrict, trainingController.getTraingData);

module.exports = router;
