import spacy

nlp = spacy.load("en_core_web_sm")

def average_sentence_length(text: str) -> float:
    """
    Avg. number of words per sentence.
    Good: 12–20 | Too high: > 25 (hard to follow)
    """
    doc = nlp(text)
    sentences = list(doc.sents)
    if not sentences:
        return 0.0
    total_words = sum(len([token for token in sent if token.is_alpha]) for sent in sentences)
    return round(total_words / len(sentences), 2)

def average_word_length(text: str) -> float:
    """
    Avg. number of characters per word.
    Good: 4–5 | Too high: > 6 (overly complex vocab)
    """
    doc = nlp(text)
    words = [token.text for token in doc if token.is_alpha]
    if not words:
        return 0.0
    return round(sum(len(word) for word in words) / len(words), 2)

def syntactic_depth(text: str) -> float:
    """
    Avg. syntactic tree depth of sentences.
    Good: < 5 | High: > 7 (more nested, harder to parse)
    """
    doc = nlp(text)
    depths = []

    for sent in doc.sents:
        depth = 0
        for token in sent:
            current_depth = 0
            ancestor = token
            while ancestor.head != ancestor:
                ancestor = ancestor.head
                current_depth += 1
            depth = max(depth, current_depth)
        depths.append(depth)

    if not depths:
        return 0.0
    return round(sum(depths) / len(depths), 2)
