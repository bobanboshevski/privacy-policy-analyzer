from pydantic import BaseModel


class AnalysisResult(BaseModel):
    flesch_score: float
    gunning_fog_index: float
    word_count: int
    sentence_count: int
