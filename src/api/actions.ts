import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
const useMock = (import.meta.env.VITE_USE_MOCK as string | undefined) !== "false";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
});

export async function uploadSurveyVideo(file?: File): Promise<{ message: string }> {
  if (useMock || !apiBaseUrl) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { message: "Video queued for analysis" };
  }

  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  }

  const response = await apiClient.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return { message: response.data?.message ?? "Video queued" };
}

export async function generateReport(): Promise<{ reportUrl: string; generatedAt: string }> {
  if (useMock || !apiBaseUrl) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      reportUrl: "/reports/gov-roadai-latest.pdf",
      generatedAt: new Date().toISOString()
    };
  }

  const response = await apiClient.post("/api/report");
  return {
    reportUrl: response.data?.reportUrl ?? "/reports/gov-roadai-latest.pdf",
    generatedAt: response.data?.generatedAt ?? new Date().toISOString()
  };
}
