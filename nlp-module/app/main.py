from fastapi import FastAPI
from app.api.v1.endpoints import analysis

app = FastAPI(
    title="NLP Analysis Service",
    description="Performs readability and complexity analysis",
    version="1.0.0"
)

app.include_router(analysis.router, prefix="/api/v1/analyze")


@app.get("/")
def read_root():
    return {"message": "NLP Module is running"}
