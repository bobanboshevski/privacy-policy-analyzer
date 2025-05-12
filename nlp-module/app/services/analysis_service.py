from app.utils.readability_metrics import flesch_reading_ease, gunning_fog
import re
from app.models.response_models import (
    AnalysisResult,
    ReadabilityMetrics,
    ComplexityMetrics,
    AmbiguityMetrics,
    CoverageMetrics,
    UserFocusMetrics,
)
from app.utils.readability_metrics import flesch_reading_ease, gunning_fog
# from app.utils.ambiguity_metrics import compute_ambiguity
# from app.utils.coverage_metrics import compute_coverage
# from app.utils.user_focus_metrics import compute_user_focus
import re


def analyze_text(text: str) -> AnalysisResult:
    sentences = re.split(r'[.!?]+', text)
    words = text.split()

    readability = ReadabilityMetrics(
        flesch_score=flesch_reading_ease(text),
        gunning_fog_index=gunning_fog(text),
    )

    complexity = ComplexityMetrics(
        word_count=len(words),
        sentence_count=len(sentences),
    )

    # ambiguity_score = compute_ambiguity(text)  # returns dict
    # ambiguity = AmbiguityMetrics(**ambiguity_score)
    #
    # coverage_score = compute_coverage(text)
    # coverage = CoverageMetrics(**coverage_score)
    #
    # user_focus_score = compute_user_focus(text)
    # user_focus = UserFocusMetrics(**user_focus_score)

    return AnalysisResult(
        readability=readability,
        complexity=complexity,
        # ambiguity=ambiguity,
        # coverage=coverage,
        # user_focus=user_focus,
    )
