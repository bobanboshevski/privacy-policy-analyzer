from fastapi import APIRouter
from app.models.request_models import TextInput
from app.models.response_models import AnalysisResult
from app.services.analysis_service import analyze_text

router = APIRouter()


@router.post("/text", response_model=AnalysisResult)
async def analyze(input: TextInput):
    return analyze_text(input.text)


@router.get("/health")
def health_check():
    return {"status": "OK"}