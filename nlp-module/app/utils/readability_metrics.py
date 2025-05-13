import textstat


def flesch_reading_ease(text: str) -> float:
    return textstat.flesch_reading_ease(text)


def gunning_fog(text: str) -> float:
    return textstat.gunning_fog(text)


def smog_index(text: str) -> float:
    return textstat.smog_index(text)


def dale_chall_score(text: str) -> float:
    return textstat.dale_chall_readability_score(text)


def flesch_kincaid_grade(text: str) -> float:
    return textstat.flesch_kincaid_grade(text)