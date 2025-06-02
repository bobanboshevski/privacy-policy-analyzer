from pydantic import BaseModel, Field
from typing import Dict, Any, Optional, List


class ReadabilityMetrics(BaseModel):
    flesch_score: float
    gunning_fog_index: float
    smog_index: float
    dale_chall_score: float
    flesch_kincaid_grade: float


class ComplexityMetrics(BaseModel):
    word_count: int
    sentence_count: int
    avg_sentence_length: float
    avg_word_length: float
    syntactic_depth: float


class AmbiguityMetrics(BaseModel):
    vague_word_ratio: float
    passive_voice_ratio: float
    conditional_statement_ratio: float


class CoverageMetrics(BaseModel):
    coverage_score: float


class SentimentMetrics(BaseModel):
    subjectivity: float
    polarity: float
    opinion_density: float


class UserFocusMetrics(BaseModel):
    pronoun_ratio: float
    rights_phrase_density: float
    call_to_action_presence: float


class GdprComplianceMetrics(BaseModel):
    lawful_basis_coverage: float
    data_subject_rights_coverage: float
    consent_mechanism_quality: float
    dpo_information: float
    international_transfers: float
    security_measures: float
    breach_notification: float
    retention_periods: float
    overall_score: float
    compliance_percentage: int
    is_compliant: bool


class CcpaComplianceMetrics(BaseModel):
    right_to_know_coverage: float
    right_to_delete_coverage: float
    right_to_opt_out_coverage: float
    non_discrimination_coverage: float
    notice_at_collection: float
    verification_process: float
    authorized_agent_process: float = Field(
        default=0.0,
        description="Coverage of authorized agent process requirements"
    )
    overall_score: float
    compliance_percentage: int
    is_compliant: bool


# NEW FLAGGING MODELS
class ReadabilityFlags(BaseModel):
    difficult_sentences_flesch: List[str] = Field(
        default_factory=list,
        description="Sentences with very low Flesch Reading Ease scores"
    )
    high_grade_level_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences requiring high education level"
    )
    complex_sentences_gunning_fog: List[str] = Field(
        default_factory=list,
        description="Sentences with high Gunning Fog index"
    )
    hard_sentences_smog: List[str] = Field(
        default_factory=list,
        description="Sentences with high SMOG index"
    )
    difficult_sentences_dale_chall: List[str] = Field(
        default_factory=list,
        description="Sentences with high Dale-Chall score"
    )
    polysyllabic_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences with high ratio of polysyllabic words"
    )


class ComplexityFlags(BaseModel):
    long_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences that are too long"
    )
    complex_vocabulary_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences with overly complex vocabulary"
    )
    syntactically_complex_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences with high syntactic complexity"
    )


class AmbiguityFlags(BaseModel):
    vague_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences with high vague word density"
    )
    passive_voice_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences using passive voice"
    )
    conditional_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences with high conditional word density"
    )


class CoverageFlags(BaseModel):
    missing_topics: List[str] = Field(
        default_factory=list,
        description="Privacy topics not adequately covered"
    )
    weak_coverage_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences with weak topic coverage"
    )
    irrelevant_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences irrelevant to privacy policy topics"
    )


class SentimentFlags(BaseModel):
    subjective_sentences: List[str] = Field(
        default_factory=list,
        description="Highly subjective sentences"
    )
    biased_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences with strong sentiment bias"
    )
    opinion_heavy_sentences: List[str] = Field(
        default_factory=list,
        description="Opinionated sentences"
    )
    emotionally_charged_sentences: List[str] = Field(
        default_factory=list,
        description="Emotionally charged sentences"
    )
    non_neutral_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences that aren't neutral/formal"
    )


class UserFocusFlags(BaseModel):
    impersonal_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences not directly addressing users"
    )
    rights_absent_sections: List[str] = Field(
        default_factory=list,
        description="Text sections without user rights mentions"
    )
    no_action_sentences: List[str] = Field(
        default_factory=list,
        description="Passive sentences that could be more actionable"
    )
    missing_contact_sections: List[str] = Field(
        default_factory=list,
        description="Sections without contact/action information"
    )
    corporate_speak_sentences: List[str] = Field(
        default_factory=list,
        description="Sentences using corporate jargon"
    )


class AnalysisResult(BaseModel):
    readability: ReadabilityMetrics
    complexity: ComplexityMetrics
    ambiguity: AmbiguityMetrics
    coverage: CoverageMetrics
    sentiment: SentimentMetrics
    userFocus: UserFocusMetrics


class GdprAnalysisResult(BaseModel):
    gdprCompliance: GdprComplianceMetrics


class CcpaAnalysisResult(BaseModel):
    ccpaCompliance: CcpaComplianceMetrics


class FlaggingAnalysisResult(BaseModel):
    readability_flags: ReadabilityFlags
    complexity_flags: ComplexityFlags
    ambiguity_flags: AmbiguityFlags
    coverage_flags: CoverageFlags
    sentiment_flags: SentimentFlags
    user_focus_flags: UserFocusFlags