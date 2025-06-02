const PDFDocument = require("pdfkit");
const {metricThresholds, metricExplanations} = require("../../utils/analysisMetrics");


const generatePdfBuffer = async (summary, metrics, overallRating) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const buffers = [];

            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            // Title
            doc.fontSize(20).text('Privacy Policy Report', {align: 'center'}).moveDown(1.5);

            renderMarkdownText(doc, summary);

            // Metrics Section
            doc.fontSize(14).text('Analysis Metrics', {underline: true}).moveDown(0.5);

            Object.entries(metrics).forEach(([section, values]) => {
                doc.fontSize(13).fillColor('#333').text(
                    section.charAt(0).toUpperCase() + section.slice(1),
                    {underline: true}
                );
                doc.moveDown(0.3);

                Object.entries(values).forEach(([key, value]) => {
                    const isCritical = metricThresholds[key]?.(value) ?? false;
                    const color = isCritical ? 'red' : '#000';

                    doc.fontSize(12).fillColor(color).text(
                        `• ${key.replaceAll("_", " ").replace(/^./, c => c.toUpperCase())}: ${value}`,
                        {indent: 20}
                    );
                });
                doc.moveDown(1);
            });

            renderOverallRatingSection(doc, overallRating);

            // Legend
            doc.addPage().fontSize(14).fillColor('#000').text('Metric Legend', {underline: true}).moveDown(0.5);
            Object.entries(metricExplanations).forEach(([key, explanation]) => {
                doc.fontSize(12).text(
                    `• ${key.replaceAll("_", " ").replace(/^./, c => c.toUpperCase())}: ${explanation}`,
                    {indent: 20}
                );
                doc.moveDown(0.2);
            });

            doc.end();
        } catch (error) {
            // reject(error);
            throw new Error("Pdf export was not successful...");
        }
    });
};


const renderOverallRatingSection = (doc, overallRating) => {
    const label = 'Overall rating:';
    const fontSize = 18;
    doc.addPage().fontSize(fontSize);

    let ratingColor = '#22c55e';
    if (overallRating < 0.50) {
        ratingColor = '#ef4444';
    } else if (overallRating < 0.75) {
        ratingColor = '#facc15';
    }

    doc.fillColor('#000').text(label, {continued: true});
    doc.fillColor(ratingColor).text(` ${(overallRating * 10).toFixed(2)}`); // continues same line
    doc.moveDown(1.5);
    const overallScoreExplanation = `
            The overall score (1 to 10) represents the clarity, user-focus, and privacy transparency of the document. 

            It is calculated using a weighted average of 10+ metrics from six key categories:

            Critical factors (50%)
                - Coverage of important topics
                - Use of vague or ambiguous language
                - Presence of rights-related phrases
                - Presence of clear calls to action

            Medium importance (30%)
                - Readability score (Flesch)
                - Use of passive voice
                - Subjectivity and sentiment
                - Opinion density

            Helpful indicators (20%)
                - Sentence and word complexity
                - Use of conditional language
                - Use of personal pronouns

            Each metric is normalized between 0 and 1. Higher is better. Boolean metrics (like call to action presence) are handled specially. Polarity favors neutrality.

            This ensures the score reflects not just writing style, but how well the policy serves and respects the user.
            `;
    doc.fontSize(12).fillColor('#444444').text(overallScoreExplanation.trim());
    doc.moveDown(1.5);
}

const renderMarkdownText = (doc, markdownText) => {
    const lines = markdownText.split('\n');

    lines.forEach(line => {
        if (line.startsWith('## ')) {
            let text = line.replace(/^#\s/, '');
            let color = '#000';

            if (text.trim().toLowerCase().includes('positive')) {
                color = '#22c55e';
            } else if (text.trim().toLowerCase().includes('negative')) {
                color = '#ef4444';
            }
            doc.moveDown(0.5).fontSize(13).fillColor(color).text(line.replace(/^##\s/, ''), {underline: true});
        } else if (line.startsWith('# ')) {
            doc.moveDown(1).fontSize(14).fillColor('#000').text(line.replace(/^#\s/, ''), {underline: true});

        } else if (line.trim() === '') {
            doc.moveDown(0.5);
        } else {
            doc.fontSize(12).fillColor('#000').text(line);
        }
    });

    doc.moveDown(1.5);
};

module.exports = {
    generatePdfBuffer,
};