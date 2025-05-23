const {generatePdfBuffer} = require("../services/exportPdfService");


const exportPdf = async (req, res, next) => {
    try {
        const {summary, metrics} = req.body;
        if (!summary || !metrics) {
            return res.status(400).json({error: 'Missing required summary or metrics in request body.'});
        }

        const pdfBuffer = await generatePdfBuffer(summary, metrics);
        res.setHeader('Content-Disposition', 'attachment; filename=privacy_report.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    exportPdf
}