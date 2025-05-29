const {getTrainingDataFromFirestore} = require("../services/educationService");

const getTraingData = async (req, res, next) => {
    try {
        const result = await getTrainingDataFromFirestore();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching education data:", error);
        next(error);
    }
};

module.exports = {
    getTraingData
}