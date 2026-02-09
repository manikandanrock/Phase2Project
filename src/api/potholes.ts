import axios from "axios";
import mockPotholes from "./mockPotholes.json";
import { Pothole } from "./types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
const useMock = (import.meta.env.VITE_USE_MOCK as string | undefined) !== "false";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000
});

export async function fetchPotholes(): Promise<Pothole[]> {
  if (useMock || !apiBaseUrl) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return mockPotholes as Pothole[];
  }

  const response = await apiClient.get<Pothole[]>("/api/potholes");
  return response.data;
}
