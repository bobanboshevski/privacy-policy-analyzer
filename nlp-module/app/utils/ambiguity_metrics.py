import spacy
import re

nlp = spacy.load("en_core_web_sm")

VAGUE_WORDS = {
    "may", "might", "some", "usually", "often", "generally",
    "typically", "as necessary", "if needed", "commonly", "frequently"
}

def vague_word_ratio(text: str) -> float:
    """
    Ratio of vague words in text.
    Good: < 0.02 | Bad: > 0.05
    """
    words = text.lower().split()
    vague_count = sum(1 for word in words if word in VAGUE_WORDS)
    return round(vague_count / len(words) if words else 0.0,2)


def passive_voice_ratio(text: str) -> float:
    """
    Ratio of sentences using passive voice.
    Good: < 0.1 | Bad: > 0.2
    """
    doc = nlp(text)
    passive_sentences = 0
    total_sentences = 0
    for sent in doc.sents:
        total_sentences += 1
        if any(tok.dep_ == "auxpass" for tok in sent):
            passive_sentences += 1
    return round (passive_sentences / total_sentences if total_sentences else 0.0,2)


CONDITIONAL_WORDS = {"if", "when", "could", "would", "should", "unless"}

def conditional_statement_ratio(text: str) -> float:
    """
    Ratio of conditional words in text.
    Good: < 0.01 | Bad: > 0.03
    """
    words = text.lower().split()
    conditional_count = sum(1 for word in words if word in CONDITIONAL_WORDS)
    return round (conditional_count / len(words) if words else 0.0,2)