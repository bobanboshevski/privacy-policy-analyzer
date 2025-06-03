const {storeFeedbackInFirestore} = require("../services/feedbackService");
const sendFeedback = async (req, res, next) => {
    try {
        const {feedback, type} = req.body;
        const userId = req.user?.uid || null
        const result = await storeFeedbackInFirestore(feedback, userId, type);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    sendFeedback
}
