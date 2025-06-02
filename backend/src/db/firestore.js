const admin = require('../config/firebaseAdmin');

const db = admin.firestore();
const privacyPoliciesCollection = db.collection('privacyPolicies');
const trainingCollection = db.collection("trainingText");
const feedbackCollection = db.collection("feedback");
module.exports = {
    db,
    privacyPoliciesCollection,
    trainingCollection,
    feedbackCollection
};