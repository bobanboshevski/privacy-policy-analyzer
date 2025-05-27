const {privacyPoliciesCollection} = require("../../db/firestore");
const {getSignedUrlFromPath} = require("./firestoreService");

const getBestAndWorstThisWeek = async () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const snapshot = await privacyPoliciesCollection
        .where("createdAt", ">=", oneWeekAgo)
        .get();

    if (snapshot.empty) {
        return {bestPolicy: null, worstPolicy: null};
    }

    const policies = snapshot.docs.map(doc => ({
        ...doc.data()
    }));

    // Sort by overallScore descending
    policies.sort((a, b) => b.overallScore - a.overallScore);

    const bestPolicy = policies[0] || null;
    const worstPolicy = policies[policies.length - 1] || null;

    if (bestPolicy?.inputType === "pdf" && bestPolicy.originalInput) {
        try {
            bestPolicy.signedUrl = await getSignedUrlFromPath(bestPolicy.originalInput);
        } catch (err) {
            console.error(err);
            const error = new Error("Error generating URL for PDF policy");
            error.statusCode = 304;
            throw error;
        }
    }

    if (worstPolicy?.inputType === "pdf" && worstPolicy.originalInput) {
        try {
            worstPolicy.signedUrl = await getSignedUrlFromPath(worstPolicy.originalInput);
        } catch (err) {
            console.error(err);
            const error = new Error("Error generating URL for PDF policy");
            error.statusCode = 304;
            throw error;
        }
    }

    if (bestPolicy) {
        delete bestPolicy.userId;
        delete bestPolicy.createdAt;
        delete bestPolicy.extractedText;
    }

    if (worstPolicy) {
        delete worstPolicy.userId;
        delete worstPolicy.createdAt;
        delete worstPolicy.extractedText;
    }

    return {
        bestPolicy,
        worstPolicy
    };
};

module.exports = {
    getBestAndWorstThisWeek
};