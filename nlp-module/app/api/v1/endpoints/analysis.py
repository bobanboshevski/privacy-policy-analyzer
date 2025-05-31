
from fastapi import APIRouter
from app.models.request_models import TextInput
from app.models.response_models import AnalysisResult, GdprAnalysisResult, CcpaAnalysisResult
from app.services.analysis_service import analyze_text, analyze_gdpr_compliance, analyze_ccpa_compliance

router = APIRouter()


@router.post("/text", response_model=AnalysisResult)
async def analyze(input: TextInput):
    """Main analysis endpoint without compliance metrics"""
    return analyze_text(input.text)


@router.post("/gdpr", response_model=GdprAnalysisResult)
async def analyze_gdpr(input: TextInput):
    """GDPR compliance analysis endpoint"""
    return analyze_gdpr_compliance(input.text)


@router.post("/ccpa", response_model=CcpaAnalysisResult)
async def analyze_ccpa(input: TextInput):
    """CCPA compliance analysis endpoint"""
    return analyze_ccpa_compliance(input.text)


@router.get("/health")
def health_check():
    return {"status": "OK"}