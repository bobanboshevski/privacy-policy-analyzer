import textstat
import spacy
import re
from typing import List
from app.utils.flagging.pdf_formatter import format_difficult_sentences_flesch, format_hard_sentences_smog, format_polysyllabic_sentences

nlp = spacy.load("en_core_web_sm")

def flag_difficult_sentences_flesch(text: str, threshold: float = 30.0) -> List[str]:
    """
    Returns sentences with very low Flesch Reading Ease scores (< threshold).
    Default threshold: 30.0 (very difficult to read)
    """
    doc = nlp(text)
    difficult_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        if len(sentence_text.split()) < 3:  # Skip very short sentences
            continue
            
        flesch_score = textstat.flesch_reading_ease(sentence_text)
        if flesch_score < threshold:
            difficult_sentences.append(sentence_text)
    
    return format_difficult_sentences_flesch(difficult_sentences)


def flag_hard_sentences_smog(text: str, threshold: float = 14.0) -> List[str]:
    """
    Returns sentences with high SMOG index (> threshold).
    Default threshold: 14.0 (very hard to read)
    """
    doc = nlp(text)
    hard_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        if len(sentence_text.split()) < 3:  # Skip very short sentences
            continue
            
        smog_score = textstat.smog_index(sentence_text)
        if smog_score > threshold:
            hard_sentences.append(sentence_text)
    
    return format_hard_sentences_smog(hard_sentences)

def flag_polysyllabic_sentences(text: str, threshold: float = 0.3) -> List[str]:
    """
    Returns sentences with high ratio of polysyllabic words (> threshold).
    Default threshold: 0.3 (30% of words have 3+ syllables)
    """
    doc = nlp(text)
    polysyllabic_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        words = [token.text for token in sent if token.is_alpha]
        
        if len(words) < 3:  # Skip very short sentences
            continue
            
        polysyllabic_count = sum(1 for word in words if textstat.syllable_count(word) >= 3)
        polysyllabic_ratio = polysyllabic_count / len(words)
        
        if polysyllabic_ratio > threshold:
            polysyllabic_sentences.append(sentence_text)
    
    return format_polysyllabic_sentences(polysyllabic_sentences)