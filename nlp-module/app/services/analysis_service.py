from app.utils.readability_metrics import flesch_reading_ease, gunning_fog
from app.models.response_models import AnalysisResult
import re


def analyze_text(text: str) -> AnalysisResult:
    sentences = re.split(r'[.!?]+', text)
    words = text.split()

    return AnalysisResult(
        flesch_score=flesch_reading_ease(text),
        gunning_fog_index=gunning_fog(text),
        word_count=len(words),
        sentence_count=len(sentences)
    )
