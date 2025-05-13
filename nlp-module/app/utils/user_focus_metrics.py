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
    words = text.lower().split()
    total_words = len(words)
    if total_words == 0:
        return 0.0

    second_person_pronouns = ["you", "your", "yours"]
    pronoun_count = sum(1 for word in words if word in second_person_pronouns)
    return pronoun_count / total_words


def rights_phrase_density(text: str) -> float:
    text_lower = text.lower()
    matches = sum(1 for phrase in RIGHT_PHRASES if phrase in text_lower)
    return matches / len(RIGHT_PHRASES)


def call_to_action_presence(text: str) -> float:
    text_lower = text.lower()
    matches = sum(1 for pattern in CALL_TO_ACTION_PATTERNS if re.search(pattern, text_lower))
    return 1.0 if matches > 0 else 0.0