const fs = require("fs");
const pdfParse = require('pdf-parse');
const PDFParser = require("pdf2json");
const PDFExtract = require('pdf.js-extract').PDFExtract;
const { isPrivacyPolicy } = require('../../utils/pdfUtils.js');


/**
 * Analyzes a PDF file and extracts text content
 * @param {Object} pdf - The uploaded file object from multer
 * @param {Buffer} pdf.buffer - The file content as a buffer
 * @param {string} pdf.originalname - The original filename
 * @param {string} pdf.mimetype - The file mime type
 * @returns {Promise<Object>} The analysis result containing extracted text
 */

const analyzeWithPdfParse = async (pdf) => {
    try {
        const data = await pdfParse(pdf.buffer);

        let extractedText = data.text
            .replace(/\t/g, ' ')
            .replace(/\n\n/g, ' ')
            .replace(/\n/g, ' ')
            .trim();

        if (!isPrivacyPolicy(extractedText)) {
            const error = new Error("PDF does not appear to be a privacy policy.");
            error.code = 400;
            throw error;
        }

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
};


/**
 * Analyzes a PDF file using pdf2json library without writing to disk
 * @param {Object} pdf - The uploaded file object from multer
 * @param {Buffer} pdf.buffer - The file content as a buffer
 * @param {string} pdf.originalname - The original filename
 * @param {string} pdf.mimetype - The file mime type
 * @returns {Promise<Object>} The analysis result containing extracted text and metadata
 */
const analyzeWithPdf2Json = async (pdf) => {
    try {
        const pdfData = await new Promise((resolve, reject) => {
            const pdfParser = new PDFParser();
            pdfParser.on("pdfParser_dataError", errData =>
                reject(new Error("Failed to parse PDF with pdf2json: " + errData.parserError)));
            pdfParser.on("pdfParser_dataReady", pdfData => resolve(pdfData));
            pdfParser.parseBuffer(pdf.buffer);
        });

        if (!pdfData.Pages) {
            throw new Error("No pages found in parsed PDF");
        }

        let extractedText = "";
        pdfData.Pages.forEach((page) => {
            page.Texts.forEach((textItem) => {
                const line = textItem.R.map((r) => decodeURIComponent(r.T)).join("");
                extractedText += line + " ";
            });
            extractedText += "\n\n";
        });

        extractedText = extractedText
            .replace(/\t/g, " ")
            .replace(/\n\n/g, " ")
            .replace(/\n/g, " ")
            .trim();

        if (!isPrivacyPolicy(extractedText)) {
            const error = new Error("PDF does not appear to be a privacy policy.");
            error.code = 400;
            throw error;
        }

        const metadata = {
            pageCount: pdfData.Pages.length,
            info: pdfData.Meta
        };

        return {
            extractedText,
            metadata
        };
    } catch (err) {
        throw new Error(`PDF analysis failed: ${err.message}`);
    }
};

/**
 * Analyzes a PDF file using pdf.js-extract library
 * @param {Object} pdf - The uploaded file object from multer
 * @param {Buffer} pdf.buffer - The file content as a buffer
 * @param {string} pdf.originalname - The original filename
 * @param {string} pdf.mimetype - The file mime type
 * @returns {Promise<Object>} The analysis result containing extracted text and metadata
 */
const analyzeWithPdfJsExtract = async (pdf) => {
    try {
        const pdfExtract = new PDFExtract();
        const options = {
            pagerender: page => page.getTextContent({
                normalizeWhitespace: false,
                disableCombineTextItems: false
            })
        };

        const data = await pdfExtract.extractBuffer(pdf.buffer, options);
        let extractedText = "";
        const pageTexts = [];

        data.pages.forEach(page => {
            let pageText = "";

            const textByY = {};

            page.content.forEach(item => {
                const roundedY = Math.round(item.y);
                if (!textByY[roundedY]) {
                    textByY[roundedY] = [];
                }
                textByY[roundedY].push(item);
            });

            Object.keys(textByY)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .forEach(y => {
                    const lineItems = textByY[y].sort((a, b) => a.x - b.x);
                    const lineText = lineItems.map(item => item.str).join('');

                    if (lineText.trim()) {
                        pageText += lineText + ' ';
                    }
                });

            pageText = pageText.trim();
            pageTexts.push(pageText);
        });

        extractedText = pageTexts.join(' ');

        if (!isPrivacyPolicy(extractedText)) {
            const error = new Error("PDF does not appear to be a privacy policy.");
            error.code = 400;
            throw error;
        }

        const metadata = {
            pageCount: data.pages.length,
            info: data.meta || {}
        };

        return {
            extractedText,
            metadata
        };
    } catch (err) {
        throw new Error(`PDF analysis failed: ${err.message}`);
    }
};

module.exports = {
    analyzeWithPdfParse,
    analyzeWithPdf2Json,
    analyzeWithPdfJsExtract
    // sendTextToPython
};