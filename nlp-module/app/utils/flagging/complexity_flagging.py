import spacy
from typing import List

nlp = spacy.load("en_core_web_sm")

def flag_long_sentences(text: str, threshold: int = 50) -> List[str]:
    """
    Returns sentences that are too long (> threshold words).
    Default threshold: 25 words (considered hard to follow)
    """
    doc = nlp(text)
    long_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        word_count = len([token for token in sent if token.is_alpha])
        
        if word_count > threshold:
            long_sentences.append(sentence_text)
    
    return long_sentences


def flag_complex_vocabulary_sentences(text: str, threshold: float = 60.0) -> List[str]:
    """
    Returns sentences with overly complex vocabulary (avg word length > threshold).
    Default threshold: 6.0 characters per word
    """
    doc = nlp(text)
    complex_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        words = [token.text for token in sent if token.is_alpha]
        
        if not words:
            continue
            
        avg_word_length = sum(len(word) for word in words) / len(words)
        
        if avg_word_length > threshold:
            complex_sentences.append(sentence_text)
    
    return complex_sentences


def flag_syntactically_complex_sentences(text: str, threshold: int = 15) -> List[str]:
    """
    Returns sentences with high syntactic complexity (depth > threshold).
    Default threshold: 7 (considered harder to parse)
    """
    doc = nlp(text)
    complex_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        max_depth = 0
        
        for token in sent:
            current_depth = 0
            ancestor = token
            while ancestor.head != ancestor:
                ancestor = ancestor.head
                current_depth += 1
            max_depth = max(max_depth, current_depth)
        
        if max_depth > threshold:
            complex_sentences.append(sentence_text)
    
    return complex_sentences