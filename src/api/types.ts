export type Severity = "LOW" | "MEDIUM" | "HIGH";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Pothole {
  id: number;
  roadName: string;
  severity: Severity;
  depthCm: number;
  areaSqm: number;
  estimatedCostInr: number;
  detectedAt: string;
  location: GeoPoint;
}

export interface RoadPrediction {
  id: string;
  roadName: string;
  riskScore: number;
  predictedFailureDays: number;
  crackDensity: number;
}

export interface BudgetPlanItem {
  id: string;
  roadName: string;
  priority: "Critical" | "High" | "Medium";
  estimatedCostInr: number;
  reason: string;
}

export interface DashboardSummary {
  totalPotholes: number;
  avgDepthCm: number;
  totalEstimatedCostInr: number;
  budgetCapInr: number;
  highSeverityCount: number;
}

export interface DashboardData {
  city: string;
  updatedAt: string;
  summary: DashboardSummary;
  potholes: Pothole[];
  predictions: RoadPrediction[];
  budgetPlan: BudgetPlanItem[];
  activityFeed: string[];
}
