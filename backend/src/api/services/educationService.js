const {trainingCollection} = require("../../db/firestore");
const getTrainingDataFromFirestore = async () => {
    const snapshot = await trainingCollection.get();

    const trainingData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            title: data.title,
            description: data.description,
            category: data.category,
            content: data.content,
            resources: data.resources || [],
            updatedAt: data.updatedAt?.toDate() || null,
        };
    });

    return {trainingItems: trainingData};
}

module.exports = {
    getTrainingDataFromFirestore
}