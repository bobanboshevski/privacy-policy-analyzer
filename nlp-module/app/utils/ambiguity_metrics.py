import spacy
import re

nlp = spacy.load("en_core_web_sm")

VAGUE_WORDS = {
    "may", "might", "some", "usually", "often", "generally",
    "typically", "as necessary", "if needed", "commonly", "frequently"
}


def vague_word_ratio(text: str) -> float:
    words = text.lower().split()
    vague_count = sum(1 for word in words if word in VAGUE_WORDS)
    return vague_count / len(words) if words else 0.0


def passive_voice_ratio(text: str) -> float:
    doc = nlp(text)
    passive_sentences = 0
    total_sentences = 0
    for sent in doc.sents:
        total_sentences += 1
        if any(tok.dep_ == "auxpass" for tok in sent):
            passive_sentences += 1
    return passive_sentences / total_sentences if total_sentences else 0.0


CONDITIONAL_WORDS = {"if", "when", "could", "would", "should", "unless"}

def conditional_statement_ratio(text: str) -> float:
    words = text.lower().split()
    conditional_count = sum(1 for word in words if word in CONDITIONAL_WORDS)
    return conditional_count / len(words) if words else 0.0