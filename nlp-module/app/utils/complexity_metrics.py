import spacy

nlp = spacy.load("en_core_web_sm")


def average_sentence_length(text: str) -> float:
    doc = nlp(text)
    sentences = list(doc.sents)
    if not sentences:
        return 0.0
    total_words = sum(len([token for token in sent if token.is_alpha]) for sent in sentences)
    return total_words / len(sentences)


def average_word_length(text: str) -> float:
    doc = nlp(text)
    words = [token.text for token in doc if token.is_alpha]
    if not words:
        return 0.0
    return sum(len(word) for word in words) / len(words)


def syntactic_depth(text: str) -> float:
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
    return sum(depths) / len(depths)
