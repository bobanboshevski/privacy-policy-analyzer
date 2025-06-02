import re
import spacy
from typing import List

nlp = spacy.load("en_core_web_sm")

RIGHT_PHRASES = [
    "you can", "your rights", "you may request", "request access",
    "ask us to", "opt-out", "change your settings"
]

CALL_TO_ACTION_PATTERNS = [
    r"contact (us|our)", r"privacy settings", r"manage preferences", r"email (us)?",
    r"reach out", r"click here", r"visit (our )?(support|help) page"
]

def flag_impersonal_sentences(text: str, threshold: float = 0.02) -> List[str]:
    """
    Returns sentences with very low pronoun usage (< threshold).
    These sentences are not directly addressing the user.
    Default threshold: 0.02 (2% of words should be user-focused pronouns)
    """
    doc = nlp(text)
    impersonal_sentences = []
    
    second_person_pronouns = ["you", "your", "yours"]
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        words = sentence_text.lower().split()
        
        if len(words) < 5:  # Skip very short sentences
            continue
            
        pronoun_count = sum(1 for word in words if word in second_person_pronouns)
        pronoun_ratio = pronoun_count / len(words) if words else 0.0
        
        if pronoun_ratio < threshold:
            impersonal_sentences.append(sentence_text)
    
    return impersonal_sentences


def flag_rights_absent_sections(text: str, min_section_length: int = 50) -> List[str]:
    """
    Returns text sections that don't mention user rights.
    Splits text into sections and flags those without rights-related phrases.
    """
    # Split text into sections (by double newlines or periods followed by capital letters)
    sections = re.split(r'\n\n|\. [A-Z]', text)
    sections = [section.strip() for section in sections if len(section.strip()) > min_section_length]
    
    rights_absent_sections = []
    
    for section in sections:
        section_lower = section.lower()
        has_rights_mention = any(phrase in section_lower for phrase in RIGHT_PHRASES)
        
        if not has_rights_mention:
            rights_absent_sections.append(section)
    
    return rights_absent_sections


def flag_no_action_sentences(text: str) -> List[str]:
    """
    Returns sentences that describe processes but don't tell users what they can do.
    These are sentences that could benefit from more actionable language.
    """
    doc = nlp(text)
    no_action_sentences = []
    
    # Patterns that suggest actionable content
    action_indicators = [
        r"\byou can\b", r"\byou may\b", r"\bcontact\b", r"\brequest\b",
        r"\bopt-out\b", r"\bopt out\b", r"\bunsubscribe\b", r"\bmanage\b",
        r"\bchange\b", r"\bupdate\b", r"\bdelete\b", r"\baccess\b"
    ]
    
    # Patterns that suggest passive/descriptive content
    passive_indicators = [
        r"\bwe collect\b", r"\bwe use\b", r"\bwe share\b", r"\bwe store\b",
        r"\bis collected\b", r"\bis used\b", r"\bis shared\b", r"\bis stored\b",
        r"\bdata is\b", r"\binformation is\b"
    ]
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        sentence_lower = sentence_text.lower()
        
        # Check if sentence has passive/descriptive language but no actionable language
        has_passive = any(re.search(pattern, sentence_lower) for pattern in passive_indicators)
        has_action = any(re.search(pattern, sentence_lower) for pattern in action_indicators)
        
        if has_passive and not has_action and len(sentence_text.split()) > 7:
            no_action_sentences.append(sentence_text)
    
    return no_action_sentences


def flag_missing_contact_sections(text: str, section_size: int = 100) -> List[str]:
    """
    Returns sections of text that lack clear call-to-action or contact information.
    """
    # Break text into chunks
    words = text.split()
    sections = []
    
    for i in range(0, len(words), section_size):
        section = ' '.join(words[i:i + section_size])
        sections.append(section)
    
    missing_contact_sections = []
    
    for section in sections:
        section_lower = section.lower()
        has_cta = any(re.search(pattern, section_lower) for pattern in CALL_TO_ACTION_PATTERNS)
        
        if not has_cta and len(section.split()) > 20:  # Only check substantial sections
            missing_contact_sections.append(section)
    
    return missing_contact_sections


def flag_corporate_speak_sentences(text: str) -> List[str]:
    """
    Returns sentences that use corporate jargon instead of plain language.
    These sentences reduce user focus and engagement.
    """
    doc = nlp(text)
    corporate_sentences = []
    
    corporate_phrases = [
        r"pursuant to", r"in accordance with", r"with respect to",
        r"for the purposes of", r"in the event that", r"such information",
        r"said data", r"aforementioned", r"hereinafter", r"whereby",
        r"notwithstanding", r"insofar as"
    ]
    
    for sent in doc.sents:
        sentence_text = sent.text.strip()
        sentence_lower = sentence_text.lower()
        
        if any(re.search(phrase, sentence_lower) for phrase in corporate_phrases):
            corporate_sentences.append(sentence_text)
    
    return corporate_sentences