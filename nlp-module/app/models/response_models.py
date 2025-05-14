from pydantic import BaseModel


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


class AnalysisResult(BaseModel):
    readability: ReadabilityMetrics
    complexity: ComplexityMetrics
    ambiguity: AmbiguityMetrics
    coverage: CoverageMetrics
    sentiment: SentimentMetrics
    userFocus: UserFocusMetrics
