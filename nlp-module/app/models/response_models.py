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


class AnalysisResult(BaseModel):
    readability: ReadabilityMetrics
    complexity: ComplexityMetrics
    ambiguity: AmbiguityMetrics
    coverage: CoverageMetrics
    sentiment: SentimentMetrics
    userFocus: UserFocusMetrics
    gdprCompliance: GdprComplianceMetrics
    ccpaCompliance: CcpaComplianceMetrics