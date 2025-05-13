from textblob import TextBlob


def subjectivity_score(text: str) -> float:
    blob = TextBlob(text)
    return blob.sentiment.subjectivity


def polarity_score(text: str) -> float:
    blob = TextBlob(text)
    return blob.sentiment.polarity


def opinion_density(text: str) -> float:
    sentences = text.split('.')
    if not sentences:
        return 0.0

    subjective_sentences = 0
    for sentence in sentences:
        if sentence.strip():
            blob = TextBlob(sentence)
            if blob.sentiment.subjectivity > 0.5:
                subjective_sentences += 1

    return subjective_sentences / len(sentences)