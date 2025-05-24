const admin = require('../config/firebaseAdmin');

const db = admin.firestore();
const privacyPoliciesCollection = db.collection('privacyPolicies');

module.exports = {
    db,
    privacyPoliciesCollection
};