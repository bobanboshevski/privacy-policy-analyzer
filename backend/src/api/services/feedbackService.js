const {feedbackCollection} = require("../../db/firestore");
const storeFeedbackInFirestore = async (feedback, userId, type) => {
    try {
        const docRef = await feedbackCollection.add({
            feedback,
            userId: userId || "anonymous",
            type,
            createdAt: new Date()
        });
        return {
            message: 'Thank you for your feedback!',
        };
    } catch (err) {
        console.error("Error saving to Firestore:", err);
        throw err;
    }

}

module.exports = {
    storeFeedbackInFirestore
}

