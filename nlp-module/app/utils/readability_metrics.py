import textstat


def flesch_reading_ease(text: str) -> float:
    return textstat.flesch_reading_ease(text)


def gunning_fog(text: str) -> float:
    return textstat.gunning_fog(text)
