from textblob import TextBlob

def subjectivity_score(text: str) -> float:
    """
    Measures how subjective the text is (0 = objective, 1 = subjective).
    Good: Depends on context; lower for factual docs.
    """
    blob = TextBlob(text)
    return round(blob.sentiment.subjectivity, 2)

def polarity_score(text: str) -> float:
    """
    Measures sentiment polarity (-1 = negative, 1 = positive).
    Good: Near 0 for neutral texts like policies.
    """
    blob = TextBlob(text)
    return round(blob.sentiment.polarity, 2)

def opinion_density(text: str) -> float:
    """
    Fraction of sentences that are opinionated (subjectivity > 0.5).
    Good: Low for formal/legal text; high means opinion-heavy.
    """
    sentences = text.split('.')
    if not sentences:
        return 0.0

    subjective_sentences = 0
    for sentence in sentences:
        if sentence.strip():
            blob = TextBlob(sentence)
            if blob.sentiment.subjectivity > 0.5:
                subjective_sentences += 1

    return round(subjective_sentences / len(sentences), 2)
