const puppeteer = require('puppeteer');
const { isPrivacyPolicy } = require('../../utils/privacyPolicyChecker.js');

/**
 * Analyzes a URL and extracts paragraphs from its HTML content using Puppeteer.
 * @param {string} url - The URL to analyze
 * @returns {Promise<Object>} The analysis result
 */
const analyze = async (url) => {
    let browser;

    try {
        browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        let extractedText = await page.evaluate(() => {
            const paragraphs = Array.from(document.querySelectorAll('p'));
            return paragraphs.map(p => p.textContent.trim()).join(' ');
        });

        extractedText = extractedText
            .replace(/\t/g, ' ')
            .replace(/\n\n/g, ' ')
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (!isPrivacyPolicy(extractedText)) {
            const error = new Error("URL does not contain sufficient text content or is not a privacy policy.");
            error.statusCode = 400;
            throw error;
        }
        return { extractedText };
    } catch (err) {
        throw err;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = {
    analyze,
};