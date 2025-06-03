const express = require('express');
const feedbackController = require("../controllers/feedbackController");
const {verifyFirebaseTokenOptional} = require("../middlewares/authMiddleware");
const router = express.Router();


router.post('/', verifyFirebaseTokenOptional, feedbackController.sendFeedback);

module.exports = router;