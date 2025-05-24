const admin = require('../../config/firebaseAdmin');

const verifyFirebaseTokenStrict = async (req, res, next) => {
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

const verifyFirebaseTokenOptional = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer ')) {
        const idToken = authHeader.split('Bearer ')[1];

        try {
            req.user = await admin.auth().verifyIdToken(idToken);
        } catch (error) {
            console.warn('Optional token verification failed:', error.message);
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
};

module.exports = {verifyFirebaseTokenStrict, verifyFirebaseTokenOptional};