from sentence_transformers import SentenceTransformer, util
import torch

model = SentenceTransformer("all-MiniLM-L6-v2")

TOPIC_SENTENCES = {
    "data_collection": [
        "We collect personal data from users.",
        "Information you provide to us is stored.",
        "We gather data during registration."
    ],
    "data_sharing": [
        "We may share your data with third-party services.",
        "We disclose information to partners.",
        "Data might be transferred to affiliates."
    ],
    "user_rights": [
        "You have the right to access your data.",
        "Users can request deletion of their personal data.",
        "You can opt-out of certain uses."
    ],
    "security": [
        "We use encryption to protect your information.",
        "Safeguards are in place to ensure data security.",
        "Our systems are secure against unauthorized access."
    ]
}

def coverage_score(text: str, threshold: float = 0.6) -> float:
    """
    Measures how well the text covers key privacy topics using semantic similarity.
    Good: 0.75–1 (all major topics present)
    Poor: < 0.5 (few or no topics covered)
    """
    sentences = [s.strip() for s in text.split('.') if s.strip()]
    if not sentences:
        return 0.0

    text_embeddings = model.encode(sentences, convert_to_tensor=True)

    covered_topics = 0

    for topic_examples in TOPIC_SENTENCES.values():
        topic_embeddings = model.encode(topic_examples, convert_to_tensor=True)
        max_score = 0.0
        for topic_emb in topic_embeddings:
            cos_scores = util.cos_sim(topic_emb, text_embeddings)
            best = float(torch.max(cos_scores))
            max_score = max(max_score, best)

        if max_score >= threshold:
            covered_topics += 1

    return round(covered_topics / len(TOPIC_SENTENCES), 2)