import re

RIGHT_PHRASES = [
    "you can", "your rights", "you may request", "request access",
    "ask us to", "opt-out", "change your settings"
]

CALL_TO_ACTION_PATTERNS = [
    r"contact (us|our)", r"privacy settings", r"manage preferences", r"email (us)?",
    r"reach out", r"click here", r"visit (our )?(support|help) page"
]

def pronoun_ratio(text: str) -> float:
    """
    Measures the ratio of second-person pronouns (you, your, yours).
    Good: Higher ratio indicates more direct communication with the user.
    Bad: Lower ratio indicates less engagement.
    """
    words = text.lower().split()
    total_words = len(words)
    if total_words == 0:
        return 0.0

    second_person_pronouns = ["you", "your", "yours"]
    pronoun_count = sum(1 for word in words if word in second_person_pronouns)
    return round(pronoun_count / total_words, 2)

def rights_phrase_density(text: str) -> float:
    """
    Measures how often user rights-related phrases appear.
    Good: Higher ratio suggests clearer user rights explanation.
    Bad: Lower ratio suggests less emphasis on user rights.
    """
    text_lower = text.lower()
    matches = sum(1 for phrase in RIGHT_PHRASES if phrase in text_lower)
    return round(matches / len(RIGHT_PHRASES), 2)

def call_to_action_presence(text: str) -> float:
    """
    Checks for the presence of common call-to-action patterns.
    Good: Presence indicates actionable instructions for users.
    Bad: Absence suggests lack of clear instructions or user engagement.
    """
    text_lower = text.lower()
    matches = sum(1 for pattern in CALL_TO_ACTION_PATTERNS if re.search(pattern, text_lower))
    return 1.0 if matches > 0 else 0.0
