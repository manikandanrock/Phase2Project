# Gov-RoadAI Phase 2 Dashboard

A production-ready operations dashboard for smart road maintenance. It integrates depth estimation, predictive maintenance, and automated budget planning to help municipalities act before roads fail.

## Architecture overview

**Frontend (React + Vite + MUI)**
- **Presentation layer**: Modular components for overview metrics, risk predictions, budget planning, and operational feed.
- **Data access**: `src/api/dashboard.ts` fetches `/api/dashboard` through Axios and falls back to mock data when needed.
- **Typed contracts**: `src/api/types.ts` defines the JSON payload expected from the backend.

**Backend (FastAPI-ready)**
- The UI expects a `GET /api/dashboard` endpoint returning a consolidated dashboard payload.
- Configure `VITE_API_BASE_URL` to point to your API gateway.

## Data contract (real backend)

```json
{
  "city": "Chennai",
  "updatedAt": "2024-09-18T09:45:00Z",
  "summary": {
    "totalPotholes": 182,
    "avgDepthCm": 9.6,
    "totalEstimatedCostInr": 1245000,
    "budgetCapInr": 1500000,
    "highSeverityCount": 42
  },
  "potholes": [
    {
      "id": 9101,
      "roadName": "OMR IT Corridor",
      "severity": "HIGH",
      "depthCm": 12.4,
      "areaSqm": 1.4,
      "estimatedCostInr": 18500,
      "detectedAt": "2024-09-18T08:40:00Z",
      "location": { "lat": 12.912, "lng": 80.229 }
    }
  ],
  "predictions": [
    {
      "id": "pred-1",
      "roadName": "Ambattur Industrial Estate",
      "riskScore": 0.85,
      "predictedFailureDays": 35,
      "crackDensity": 0.62
    }
  ],
  "budgetPlan": [
    {
      "id": "budget-1",
      "roadName": "OMR IT Corridor",
      "priority": "Critical",
      "estimatedCostInr": 310000,
      "reason": "High severity cluster near IT parks"
    }
  ],
  "activityFeed": [
    "Depth model processed 18 new frames (08:30)."
  ]
}
```

## Mock + real backend integration

**Default (mock data)**
- The app includes `src/api/mockDashboard.json` and uses it automatically unless `VITE_USE_MOCK=false` and `VITE_API_BASE_URL` is defined.

**Real backend**
- Example FastAPI endpoint:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/dashboard")
async def get_dashboard():
    return {
        "city": "Chennai",
        "updatedAt": "2024-09-18T09:45:00Z",
        "summary": {
            "totalPotholes": 182,
            "avgDepthCm": 9.6,
            "totalEstimatedCostInr": 1245000,
            "budgetCapInr": 1500000,
            "highSeverityCount": 42,
        },
        "potholes": [
            {
                "id": 9101,
                "roadName": "OMR IT Corridor",
                "severity": "HIGH",
                "depthCm": 12.4,
                "areaSqm": 1.4,
                "estimatedCostInr": 18500,
                "detectedAt": "2024-09-18T08:40:00Z",
                "location": {"lat": 12.912, "lng": 80.229},
            }
        ],
        "predictions": [
            {
                "id": "pred-1",
                "roadName": "Ambattur Industrial Estate",
                "riskScore": 0.85,
                "predictedFailureDays": 35,
                "crackDensity": 0.62,
            }
        ],
        "budgetPlan": [
            {
                "id": "budget-1",
                "roadName": "OMR IT Corridor",
                "priority": "Critical",
                "estimatedCostInr": 310000,
                "reason": "High severity cluster near IT parks",
            }
        ],
        "activityFeed": ["Depth model processed 18 new frames (08:30)."],
    }
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
