const {getBestAndWorstThisWeek} = require("../services/policyService");

const getBestAndWorstPolicies = async (req, res, next) => {
    try {
        const result = await getBestAndWorstThisWeek();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBestAndWorstPolicies,
};