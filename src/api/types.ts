export type Severity = "LOW" | "MEDIUM" | "HIGH";

export interface Pothole {
  id: number;
  severity: Severity;
  cost: number;
}

export interface PotholeSummary {
  total: number;
  totalCost: number;
  highCount: number;
  bySeverity: Record<Severity, number>;
}
