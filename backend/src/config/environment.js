require('dotenv').config()

const environment = {
    PORT: process.env.PORT || 3001,
    ALLOWED_ORIGINS: [
        'http://localhost:3000',
        'https://privacy-policy-analyzer-xi.vercel.app'
    ],
}

module.exports = environment;