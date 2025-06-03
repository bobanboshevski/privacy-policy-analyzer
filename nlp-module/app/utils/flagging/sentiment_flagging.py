from textblob import TextBlob
import spacy
from typing import List

nlp = spacy.load("en_core_web_sm")

def flag_biased_sentences(text: str, threshold: float = 0.4) -> List[str]:
    """
    Returns sentences with strong sentiment polarity (absolute value > threshold).
    Default threshold: 0.4 (should be near neutral for policies)
    """
    doc = nlp(text)
    biased_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        if not sentence_text:
            continue
            
        blob = TextBlob(sentence_text)
        if abs(blob.sentiment.polarity) > threshold:
            biased_sentences.append(sentence_text)
    
    return biased_sentences


def flag_opinion_heavy_sentences(text: str, subjectivity_threshold: float = 0.5) -> List[str]:
    """
    Returns sentences that are opinionated (subjectivity > threshold).
    Default threshold: 0.5 (moderately subjective)
    These sentences contribute to high opinion density.
    """
    doc = nlp(text)
    opinion_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        if not sentence_text:
            continue
            
        blob = TextBlob(sentence_text)
        if blob.sentiment.subjectivity > subjectivity_threshold:
            opinion_sentences.append(sentence_text)
    
    return opinion_sentences


def flag_emotionally_charged_sentences(text: str, polarity_threshold: float = 0.3) -> List[str]:
    """
    Returns sentences with notable emotional charge (polarity > threshold).
    Default threshold: 0.3 (noticeably positive or negative)
    """
    doc = nlp(text)
    emotional_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        if not sentence_text:
            continue
            
        blob = TextBlob(sentence_text)
        if abs(blob.sentiment.polarity) > polarity_threshold:
            emotional_sentences.append(sentence_text)
    
    return emotional_sentences