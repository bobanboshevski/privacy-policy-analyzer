const admin = require('../../config/firebaseAdmin');

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({error: 'Missing or invalid Authorization header'});
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
        req.user = await admin.auth().verifyIdToken(idToken);
        next();
    } catch (error) {
        console.error('Firebase Auth Error:', error);
        return res.status(403).json({error: 'Unauthorized'});
    }
};

module.exports = verifyFirebaseToken;