const fs = require("fs");
const pdfParse = require('pdf-parse');
const {post} = require("axios");

/**
 * Analyzes a PDF file and extracts text content
 * @param {Object} pdf - The uploaded file object from multer
 * @param {Buffer} pdf.buffer - The file content as a buffer
 * @param {string} pdf.originalname - The original filename
 * @param {string} pdf.mimetype - The file mime type
 * @returns {Promise<Object>} The analysis result containing extracted text
 */
const analyze = async (pdf) => {
    try {
        const data = await pdfParse(pdf.buffer);

        let extractedText = data.text
            .replace(/\t/g, ' ')
            .replace(/\n\n/g, ' ')
            .replace(/\n/g, ' ')
            .trim();

        const metadata = {
            pageCount: data.numpages,
            info: data.info || {},
        };

        return {
            extractedText,
            metadata
        };
    } catch (err) {
        throw new Error(`PDF analysis failed: ${err.message}`);
    }
}

module.exports = {
    analyze,
    // sendTextToPython
};