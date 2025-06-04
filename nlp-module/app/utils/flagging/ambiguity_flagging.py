import spacy
import re
from typing import List
from app.utils.flagging.pdf_formatter import format_vague_sentences, format_passive_voice_sentences, format_conditional_sentences

nlp = spacy.load("en_core_web_sm")

VAGUE_WORDS = {
    "may", "might", "some", "usually", "often", "generally",
    "typically", "as necessary", "if needed", "commonly", "frequently"
}

def flag_vague_sentences(text: str, threshold: float = 0.05) -> List[str]:
    """
    Returns sentences with high vague word density.
    Flags sentences where vague word ratio > threshold (default 0.05)
    """
    doc = nlp(text)
    problematic_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        words = sentence_text.lower().split()
        if not words:
            continue
            
        vague_count = sum(1 for word in words if word in VAGUE_WORDS)
        vague_ratio = vague_count / len(words)
        
        if vague_ratio > threshold:
            problematic_sentences.append(sentence_text)
    
    return format_vague_sentences(problematic_sentences)


def flag_passive_voice_sentences(text: str) -> List[str]:
    """
    Returns sentences using passive voice.
    """
    doc = nlp(text)
    passive_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        if any(tok.dep_ == "auxpass" for tok in sent):
            passive_sentences.append(sentence_text)
    
    return format_passive_voice_sentences(passive_sentences)


CONDITIONAL_WORDS = {"if", "when", "could", "would", "should", "unless"}

def flag_conditional_sentences(text: str, threshold: float = 0.03) -> List[str]:
    """
    Returns sentences with high conditional word density.
    Flags sentences where conditional word ratio > threshold (default 0.03)
    """
    doc = nlp(text)
    problematic_sentences = []
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        words = sentence_text.lower().split()
        if not words:
            continue
            
        conditional_count = sum(1 for word in words if word in CONDITIONAL_WORDS)
        conditional_ratio = conditional_count / len(words)
        
        if conditional_ratio > threshold:
            problematic_sentences.append(sentence_text)
    
    return format_conditional_sentences(problematic_sentences)