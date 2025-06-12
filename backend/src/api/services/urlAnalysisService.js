const puppeteer = require('puppeteer');
const { isPrivacyPolicy } = require('../../utils/privacyPolicyChecker.js');

/**
 * Analyzes a URL and extracts paragraphs from its HTML content using Puppeteer.
 * @param {string} url - The URL to analyze
 * @returns {Promise<Object>} The root-analysis result
 */
const analyze = async (url) => {
    let browser;

    try {
        browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        await page.waitForSelector('p, span', { timeout: 15000 });

        let extractedText = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('p, span'))
                .filter(el => el.offsetParent !== null);
            return elements
                .map(el => el.textContent.trim())
                .filter(text => text.length > 30)
                .join(' ');
        });

        extractedText = extractedText
            .replace(/\t/g, ' ')
            .replace(/\n\n/g, ' ')
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (!extractedText || extractedText.length < 300) {
            const error = new Error("Insufficient text content extracted from the page. Page may be protected from analysis.");
            error.statusCode = 400;
            throw error;
        }

        if (!isPrivacyPolicy(extractedText)) {
            const error = new Error("Page content does not resemble a privacy policy.");
            error.statusCode = 400;
            throw error;
        }

        return { extractedText };
    } catch (err) {
        console.error(`Error analyzing URL ${url}:`, err.message);
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
