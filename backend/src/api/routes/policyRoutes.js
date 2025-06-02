const express = require('express');
const {verifyFirebaseTokenStrict} = require("../middlewares/authMiddleware");
const policyController = require("../controllers/policyController");
const router = express.Router();


router.get("/best-worst", verifyFirebaseTokenStrict, policyController.getBestAndWorstPolicies);


module.exports = router;