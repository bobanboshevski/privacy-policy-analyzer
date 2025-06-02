import re
from typing import Dict, Any, Optional

from app.models.response_models import (
    AnalysisResult,
    GdprAnalysisResult,
    CcpaAnalysisResult,
    FlaggingAnalysisResult,
    ReadabilityMetrics,
    ComplexityMetrics,
    AmbiguityMetrics,
    CoverageMetrics,
    SentimentMetrics,
    UserFocusMetrics,
    ReadabilityFlags,
    ComplexityFlags,
    AmbiguityFlags,
    CoverageFlags,
    SentimentFlags,
    UserFocusFlags,
    GdprComplianceMetrics,
    CcpaComplianceMetrics
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

from app.utils.compliance_analyzers import (
    analyze_gdpr_compliance_metrics,
    analyze_ccpa_compliance_metrics
)

# NEW FLAGGING IMPORTS
from app.utils.flagging.readability_flagging import (
    flag_difficult_sentences_flesch,
    flag_high_grade_level_sentences,
    flag_complex_sentences_gunning_fog,
    flag_hard_sentences_smog,
    flag_difficult_sentences_dale_chall,
    flag_polysyllabic_sentences
)

from app.utils.flagging.complexity_flagging import (
    flag_long_sentences,
    flag_complex_vocabulary_sentences,
    flag_syntactically_complex_sentences
)

from app.utils.flagging.ambiguity_flagging import (
    flag_vague_sentences,
    flag_passive_voice_sentences,
    flag_conditional_sentences
)

from app.utils.flagging.coverage_flagging import (
    flag_missing_topics,
    flag_irrelevant_sentences
)

from app.utils.flagging.sentiment_flagging import (
    flag_subjective_sentences,
    flag_biased_sentences,
    flag_opinion_heavy_sentences,
    flag_emotionally_charged_sentences,
    flag_non_neutral_sentences
)

from app.utils.flagging.user_focus_flagging import (
    flag_impersonal_sentences,
    flag_rights_absent_sections,
    flag_no_action_sentences,
    flag_missing_contact_sections,
    flag_corporate_speak_sentences
)


def analyze_text(text: str) -> AnalysisResult:
    """Main text analysis function without compliance metrics"""
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

    user_focus = UserFocusMetrics(
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
        userFocus=user_focus
    )


def analyze_text_flagging(text: str) -> FlaggingAnalysisResult:
    """Main text flagging analysis function - returns problematic sentences"""
    
    # Readability flagging
    readability_flags = ReadabilityFlags(
        difficult_sentences_flesch=flag_difficult_sentences_flesch(text),
        high_grade_level_sentences=flag_high_grade_level_sentences(text),
        complex_sentences_gunning_fog=flag_complex_sentences_gunning_fog(text),
        hard_sentences_smog=flag_hard_sentences_smog(text),
        difficult_sentences_dale_chall=flag_difficult_sentences_dale_chall(text),
        polysyllabic_sentences=flag_polysyllabic_sentences(text)
    )

    # Complexity flagging
    complexity_flags = ComplexityFlags(
        long_sentences=flag_long_sentences(text),
        complex_vocabulary_sentences=flag_complex_vocabulary_sentences(text),
        syntactically_complex_sentences=flag_syntactically_complex_sentences(text)
    )

    # Ambiguity flagging
    ambiguity_flags = AmbiguityFlags(
        vague_sentences=flag_vague_sentences(text),
        passive_voice_sentences=flag_passive_voice_sentences(text),
        conditional_sentences=flag_conditional_sentences(text)
    )

    # Coverage flagging
    coverage_data = flag_missing_topics(text)
    coverage_flags = CoverageFlags(
        missing_topics=coverage_data.get("missing_topics", []),
        weak_coverage_sentences=coverage_data.get("weak_coverage_sentences", []),
        irrelevant_sentences=flag_irrelevant_sentences(text)
    )

    # Sentiment flagging
    sentiment_flags = SentimentFlags(
        subjective_sentences=flag_subjective_sentences(text),
        biased_sentences=flag_biased_sentences(text),
        opinion_heavy_sentences=flag_opinion_heavy_sentences(text),
        emotionally_charged_sentences=flag_emotionally_charged_sentences(text),
        non_neutral_sentences=flag_non_neutral_sentences(text)
    )

    # User focus flagging
    user_focus_flags = UserFocusFlags(
        impersonal_sentences=flag_impersonal_sentences(text),
        rights_absent_sections=flag_rights_absent_sections(text),
        no_action_sentences=flag_no_action_sentences(text),
        missing_contact_sections=flag_missing_contact_sections(text),
        corporate_speak_sentences=flag_corporate_speak_sentences(text)
    )

    return FlaggingAnalysisResult(
        readability_flags=readability_flags,
        complexity_flags=complexity_flags,
        ambiguity_flags=ambiguity_flags,
        coverage_flags=coverage_flags,
        sentiment_flags=sentiment_flags,
        user_focus_flags=user_focus_flags
    )


def analyze_gdpr_compliance(text: str) -> GdprAnalysisResult:
    """Separate GDPR compliance analysis function"""
    gdpr_compliance = analyze_gdpr_compliance_metrics(text)
    
    return GdprAnalysisResult(
        gdprCompliance=gdpr_compliance
    )


def analyze_ccpa_compliance(text: str) -> CcpaAnalysisResult:
    """Separate CCPA compliance analysis function"""
    ccpa_compliance = analyze_ccpa_compliance_metrics(text)
    
    return CcpaAnalysisResult(
        ccpaCompliance=ccpa_compliance
    )