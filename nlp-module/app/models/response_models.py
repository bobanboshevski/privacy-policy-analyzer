from pydantic import BaseModel


class ReadabilityMetrics(BaseModel):
    flesch_score: float
    gunning_fog_index: float


class ComplexityMetrics(BaseModel):
    word_count: int
    sentence_count: int


class AmbiguityMetrics(BaseModel):
    vague_word_ratio: float


class CoverageMetrics(BaseModel):
    coverage_score: float


class UserFocusMetrics(BaseModel):
    user_focus_ratio: float


class AnalysisResult(BaseModel):
    readability: ReadabilityMetrics
    complexity: ComplexityMetrics
    # ambiguity: AmbiguityMetrics
    # coverage: CoverageMetrics
    # user_focus: UserFocusMetrics
