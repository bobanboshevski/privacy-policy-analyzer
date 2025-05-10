// /api/services/urlAnalysisService.js
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Analyzes a URL and extracts paragraphs from its HTML content.
 * @param {string} url - The URL to analyze
 * @returns {Promise<Object>} The analysis result
 */
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
const analyze = async (url) => {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
  
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
      throw new Error(`URL analysis failed: ${err.message}`);
    }
  };
  
  module.exports = {
    analyze,
  };
