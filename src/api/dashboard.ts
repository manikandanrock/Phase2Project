import axios from "axios";
import mockDashboard from "./mockDashboard.json";
import { DashboardData } from "./types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
const useMock = (import.meta.env.VITE_USE_MOCK as string | undefined) !== "false";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 8000
});

export async function fetchDashboard(): Promise<DashboardData> {
  if (useMock || !apiBaseUrl) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return mockDashboard as DashboardData;
  }

  const response = await apiClient.get<DashboardData>("/api/dashboard");
  return response.data;
}
