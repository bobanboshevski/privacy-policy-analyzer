// /api/services/urlAnalysisService.js
const axios = require('axios');
const cheerio = require('cheerio');


/**
 * Analyzes a URL and extracts paragraphs from its HTML content.
 * @param {string} url - The URL to analyze
 * @returns {Promise<Object>} The analysis result
 */
const analyze = async (url) => {
  try {
    const { data } = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(data);

    const title = $('title').text().toLowerCase();
    const headings = $('h1, h2, h3').text().toLowerCase();
    const pathValid = /privacy/.test(new URL(url).pathname);
    const textValid = title.includes("privacy") || headings.includes("privacy");

    if (!pathValid && !textValid) {
      const error = new Error("URL does not appear to point to a privacy policy.");
      error.code = 400; // client error
      throw error;
    }

    let extractedText = '';
    $('p').each((_, el) => {
      extractedText += $(el).text().trim() + ' ';
    });

    extractedText = extractedText
      .replace(/\t/g, ' ')
      .replace(/\n\n/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return { extractedText };
  } catch (err) {
    const message = err.code === 400
      ? err.message
      : `URL analysis failed: ${err.message}`;
    const error = new Error(message);
    error.code = err.code || 500;
    throw error;
  }
};

module.exports = {
  analyze,
};



  /* extracting text as paragraphs
const analyze = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const paragraphs = [];
        $('p').each((_, el) => {
            paragraphs.push($(el).text().trim());
        });

        return { paragraphs };
    } catch (err) {
        throw new Error(`URL analysis failed: ${err.message}`);
    }
};*/