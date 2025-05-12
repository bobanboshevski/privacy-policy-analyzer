const Anthropic = require("@anthropic-ai/sdk");
require('dotenv').config();
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});


const summarizeText = async (text) => {
    const response = await anthropic.messages.create({
        model: "claude-3-7-sonnet-20250219",  // Sonnet model
        max_tokens: 1000,
        temperature: 0.3, // higher - more creative, lower - more focused and factual
        // top_p,
        messages: [
            {
                role: "user",
                // content: `Summarize the following privacy policy text in 200 words:\n\n${text}`
                // content: `Please summarize the following privacy policy into a clear, non-technical explanation of under 200 words:\n\n${text}`
                content: `Please analyze the following privacy policy text and return a response with the following structure:
                1. **Summary** (max 200 words): A clear, plain-language summary of what the policy covers.
                2. **Positive Aspects**: List any user-friendly, transparent, or protective elements of the policy.
                3. **Negative Aspects / Concerns**: List any vague, concerning, or privacy-invasive elements.
                Text to analyze:
                ${text}`
            }
        ]
    });
    return response.content;
}

module.exports = {
    summarizeText
}
