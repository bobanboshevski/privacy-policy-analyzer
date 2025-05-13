import re
from app.models.response_models import (
    AnalysisResult,
    ReadabilityMetrics,
    ComplexityMetrics,
    AmbiguityMetrics,
    CoverageMetrics,
    SentimentMetrics,
    UserFocusMetrics
)

from app.utils.readability_metrics import (
    flesch_reading_ease,
    gunning_fog,
    smog_index,
    dale_chall_score,
    flesch_kincaid_grade
)

from app.utils.ambiguity_metrics import (
    vague_word_ratio,
    passive_voice_ratio,
    conditional_statement_ratio,
)

from app.utils.complexity_metrics import (
    average_sentence_length,
    average_word_length,
    syntactic_depth,
)

from app.utils.coverage_metrics import coverage_score

from app.utils.sentiment_metrics import (
    subjectivity_score,
    polarity_score,
    opinion_density,
)

from app.utils.user_focus_metrics import (
    pronoun_ratio,
    rights_phrase_density,
    call_to_action_presence,
)


def analyze_text(text: str) -> AnalysisResult:
    sentences = re.split(r'[.!?]+', text)
    words = text.split()

    readability = ReadabilityMetrics(
        flesch_score=flesch_reading_ease(text),
        gunning_fog_index=gunning_fog(text),
        smog_index=smog_index(text),
        dale_chall_score=dale_chall_score(text),
        flesch_kincaid_grade=flesch_kincaid_grade(text)
    )

    complexity = ComplexityMetrics(
        word_count=len(words),
        sentence_count=len(sentences),
        avg_sentence_length=average_sentence_length(text),
        avg_word_length=average_word_length(text),
        syntactic_depth=syntactic_depth(text),
    )

    ambiguity = AmbiguityMetrics(
        vague_word_ratio=vague_word_ratio(text),
        passive_voice_ratio=passive_voice_ratio(text),
        conditional_statement_ratio=conditional_statement_ratio(text),
    )

    coverage = CoverageMetrics(
        coverage_score=coverage_score(text)
    )

    sentiment = SentimentMetrics(
        subjectivity=subjectivity_score(text),
        polarity=polarity_score(text),
        opinion_density=opinion_density(text),
    )

    userFocus = UserFocusMetrics(
        pronoun_ratio=pronoun_ratio(text),
        rights_phrase_density=rights_phrase_density(text),
        call_to_action_presence=call_to_action_presence(text),
    )

    return AnalysisResult(
        readability=readability,
        complexity=complexity,
        ambiguity=ambiguity,
        coverage=coverage,
        sentiment=sentiment,
        userFocus=userFocus,
    )
