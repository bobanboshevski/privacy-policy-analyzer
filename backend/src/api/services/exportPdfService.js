const PDFDocument = require("pdfkit");
const {metricThresholds, metricExplanations} = require("../../utils/analysisMetrics");


const generatePdfBuffer = async (summary, metrics) => {
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

            // Summary
            doc.fontSize(14).text('Summary', {underline: true}).moveDown(0.5);
            doc.fontSize(12).text(summary).moveDown(1.5);

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
            reject(error);
        }
    });
};

module.exports = {
    generatePdfBuffer,
};