import textstat

def flesch_reading_ease(text: str) -> float:
    """
    Higher is easier to read.
    Good: 60–100 (easy), Bad: <30 (very difficult)
    """
    return textstat.flesch_reading_ease(text)

def gunning_fog(text: str) -> float:
    """
    Estimates years of formal education needed.
    Good: <12 (high school level), Bad: >16 (college+)
    """
    return textstat.gunning_fog(text)

def smog_index(text: str) -> float:
    """
    Like Gunning Fog, based on polysyllables.
    Good: <10 (easy), Bad: >14 (very hard)
    """
    return textstat.smog_index(text)

def dale_chall_score(text: str) -> float:
    """
    Measures readability based on familiar word list.
    Good: <6 (understandable), Bad: >8 (difficult)
    """
    return textstat.dale_chall_readability_score(text)

def flesch_kincaid_grade(text: str) -> float:
    """
    U.S. school grade level.
    Good: <10 (high school), Bad: >12 (college+)
    """
    return textstat.flesch_kincaid_grade(text)
