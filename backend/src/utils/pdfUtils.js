// backend/utils/pdfUtils.js

const isPrivacyPolicy = (text) => {
    const lowerText = text.toLowerCase();
    return lowerText.includes("privacy policy") ||
           lowerText.includes("data protection") ||
           lowerText.includes("gdpr") ||
           lowerText.includes("personal data") ||
           lowerText.includes("data collection");
};

module.exports = {
    isPrivacyPolicy
};