const admin = require('../config/firebaseAdmin');

const db = admin.firestore();
const privacyPoliciesCollection = db.collection('privacyPolicies');
const trainingCollection = db.collection("trainingText");
module.exports = {
    db,
    privacyPoliciesCollection,
    trainingCollection
};