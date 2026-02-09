from datetime import datetime
from typing import Any, Dict

from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import json
from pathlib import Path

app = FastAPI(title="Gov-RoadAI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"] ,
)

DATA_PATH = Path(__file__).resolve().parent.parent / "src" / "api" / "mockDashboard.json"


def load_dashboard() -> Dict[str, Any]:
    payload = json.loads(DATA_PATH.read_text())
    payload["updatedAt"] = datetime.utcnow().isoformat() + "Z"
    return payload


@app.get("/api/dashboard")
async def get_dashboard() -> Dict[str, Any]:
    return load_dashboard()


@app.post("/api/upload")
async def upload_video(file: UploadFile) -> Dict[str, Any]:
    contents = await file.read()
    return {
        "status": "received",
        "filename": file.filename,
        "bytes": len(contents),
        "message": "Video queued for analysis",
    }


@app.post("/api/report")
async def generate_report() -> Dict[str, Any]:
    return {
        "status": "generated",
        "reportUrl": "/reports/gov-roadai-latest.pdf",
        "generatedAt": datetime.utcnow().isoformat() + "Z",
    }
