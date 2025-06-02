from sentence_transformers import SentenceTransformer, util
import torch
from typing import List, Dict

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

def flag_missing_topics(text: str, threshold: float = 0.6) -> Dict[str, List[str]]:
    """
    Returns information about topic coverage gaps.
    Returns dict with:
    - 'missing_topics': list of topics not adequately covered
    - 'weak_coverage_sentences': sentences that weakly match important topics
    """
    sentences = [s.strip() for s in text.split('.') if s.strip()]
    if not sentences:
        return {"missing_topics": list(TOPIC_SENTENCES.keys()), "weak_coverage_sentences": []}

    text_embeddings = model.encode(sentences, convert_to_tensor=True)
    
    missing_topics = []
    weak_coverage_sentences = []

    for topic, topic_examples in TOPIC_SENTENCES.items():
        topic_embeddings = model.encode(topic_examples, convert_to_tensor=True)
        max_score = 0.0
        best_sentence = ""
        
        for i, topic_emb in enumerate(topic_embeddings):
            cos_scores = util.cos_sim(topic_emb, text_embeddings)
            sentence_scores = [(float(score), sentences[j]) for j, score in enumerate(cos_scores[0])]
            sentence_scores.sort(reverse=True)
            
            best_score_for_topic = sentence_scores[0][0] if sentence_scores else 0.0
            if best_score_for_topic > max_score:
                max_score = best_score_for_topic
                best_sentence = sentence_scores[0][1] if sentence_scores else ""

        if max_score < threshold:
            missing_topics.append(topic)
            # If there's some weak coverage (score between 0.3 and threshold), flag it
            if max_score > 0.3 and best_sentence:
                weak_coverage_sentences.append(best_sentence)

    return {
        "missing_topics": missing_topics,
        "weak_coverage_sentences": weak_coverage_sentences
    }


def flag_irrelevant_sentences(text: str, relevance_threshold: float = 0.2) -> List[str]:
    """
    Returns sentences that seem irrelevant to privacy policy topics.
    Flags sentences with very low similarity to any privacy topic.
    """
    sentences = [s.strip() for s in text.split('.') if s.strip()]
    if not sentences:
        return []

    text_embeddings = model.encode(sentences, convert_to_tensor=True)
    all_topic_examples = []
    for topic_examples in TOPIC_SENTENCES.values():
        all_topic_examples.extend(topic_examples)
    
    topic_embeddings = model.encode(all_topic_examples, convert_to_tensor=True)
    irrelevant_sentences = []

    for i, sentence in enumerate(sentences):
        max_similarity = 0.0
        for topic_emb in topic_embeddings:
            similarity = float(util.cos_sim(topic_emb, text_embeddings[i]))
            max_similarity = max(max_similarity, similarity)
        
        if max_similarity < relevance_threshold:
            irrelevant_sentences.append(sentence)

    return irrelevant_sentences