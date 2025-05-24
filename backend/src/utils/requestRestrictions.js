const fileUploadConfig = require('./../utils/fileUploadConfig')

const enforceFileOnly = (req, res, next) => {
    fileUploadConfig.pdfUpload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'PDF file is required'
            });
        }

        if (Object.keys(req.body).length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Only a PDF file is allowed. No additional fields should be sent.'
            });
        }
        next();
    });
};

module.exports = {
    enforceFileOnly
};