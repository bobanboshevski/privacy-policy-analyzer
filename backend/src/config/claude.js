const Anthropic = require("@anthropic-ai/sdk");
require('dotenv').config();

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

module.exports = {
    anthropic
};