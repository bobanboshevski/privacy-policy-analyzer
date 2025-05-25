const isPrivacyPolicy = (text) => {
    const cleanedText = text
        .toLowerCase()
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ') 
        .trim();

    const patterns = [
        /privacy policy/,
        /data protection/,
        /\b(gdpr|ccpa|lgpd)\b/,
        /personal (data|information)/,
        /data (collection|processing|usage|sharing)/,
        /user (data|information) rights?/,
        /information we collect/,
        /how we use (your )?data/,
        /third[- ]party data/,
        /your privacy/,
        /cookie (policy|usage)/,
        /data retention/,
        /data security/,
        /consent to (data|information) collection/
    ];

    return patterns.some((pattern) => pattern.test(cleanedText));
};

module.exports = {
    isPrivacyPolicy
};
