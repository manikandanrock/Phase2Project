# Gov-RoadAI Pothole Dashboard

A production-style React dashboard for monitoring pothole detection results, severity mix, and remediation costs. The UI ships with mock data for demos and connects to a real backend using a configurable API base URL.

## Architecture overview

**Frontend (React + Vite + MUI)**
- **Presentation layer**: Modular components for summary cards, severity chart, and inspection table.
- **Data access**: `src/api/potholes.ts` fetches `/api/potholes` through Axios and falls back to mock data when needed.
- **Typed contracts**: `src/api/types.ts` defines the expected payload schema for pothole findings.

**Backend (FastAPI-ready)**
- The UI expects a `GET /api/potholes` endpoint returning a list of pothole objects.
- Configure `VITE_API_BASE_URL` to point to your API gateway.

## Data contract

```json
[
  { "id": 101, "severity": "HIGH", "cost": 4500 },
  { "id": 102, "severity": "MEDIUM", "cost": 2200 },
  { "id": 103, "severity": "LOW", "cost": 600 }
]
```

## Mock + real backend integration

**Default (mock data)**
- The app includes `src/api/mockPotholes.json` and uses it automatically unless `VITE_USE_MOCK=false` and `VITE_API_BASE_URL` is defined.

**Real backend**
- Example FastAPI endpoint:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/potholes")
async def get_potholes():
    return [
        {"id": 101, "severity": "HIGH", "cost": 4500},
        {"id": 102, "severity": "MEDIUM", "cost": 2200},
        {"id": 103, "severity": "LOW", "cost": 600},
    ]
```

- Run with real data:

```bash
VITE_USE_MOCK=false VITE_API_BASE_URL=http://localhost:8000 npm run dev
```

## How to run

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.
