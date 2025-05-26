const {db, privacyPoliciesCollection} = require("../../db/firestore");
const {getStorage} = require("firebase-admin/storage");
const admin = require('../../config/firebaseAdmin');

const saveAnalysisToFirestore = async ({
                                           inputType,
                                           userId,
                                           originalInput,
                                           extractedText,
                                           nlpAnalysis,
                                           overallScore,
                                           summary
                                       }) => {
    try {
        const docRef = await privacyPoliciesCollection.add({
            inputType,
            userId: userId || "anonymous",
            originalInput,
            extractedText,
            nlpAnalysis,
            overallScore,
            summary,
            createdAt: new Date()
        });
        return docRef.id;
    } catch (err) {
        console.error("Error saving to Firestore:", err);
        throw err;
    }
};

const uploadPdfAndGetPath = async (file) => {
    const storage = getStorage();
    const bucket = storage.bucket();
    const uniqueFilename = `pdfs/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(uniqueFilename);

    await fileUpload.save(file.buffer, {
        metadata: {
            contentType: file.mimetype
        }
    });

    return uniqueFilename; // You can generate signed URL later on request
}

const getSignedUrlFromPath = async (path) => {
    const file = getStorage().bucket().file(path);

    const [signedUrl] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 60 * 60 * 1000 // valid for 1 hour
    });
    return signedUrl;
}


module.exports = {
    saveAnalysisToFirestore,
    uploadPdfAndGetPath,
    getSignedUrlFromPath
};