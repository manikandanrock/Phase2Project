import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Container, CssBaseline, Grid, Stack } from "@mui/material";
import Header from "./components/Header";
import OverviewCards from "./components/OverviewCards";
import PredictionPanel from "./components/PredictionPanel";
import BudgetPlanner from "./components/BudgetPlanner";
import PotholeTable from "./components/PotholeTable";
import StatusFeedback from "./components/StatusFeedback";
import MapPanel from "./components/MapPanel";
import ActivityFeed from "./components/ActivityFeed";
import VirtualSurveyor from "./components/VirtualSurveyor";
import IntakePanel from "./components/IntakePanel";
import ReportPanel from "./components/ReportPanel";
import { fetchDashboard } from "./api/dashboard";
import { DashboardData } from "./api/types";

const initialState: DashboardData = {
  city: "",
  updatedAt: new Date().toISOString(),
  summary: {
    totalPotholes: 0,
    avgDepthCm: 0,
    totalEstimatedCostInr: 0,
    budgetCapInr: 1,
    highSeverityCount: 0
  },
  potholes: [],
  predictions: [],
  budgetPlan: [],
  activityFeed: []
};

function App() {
  const [data, setData] = useState<DashboardData>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reporting, setReporting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadDashboard = useCallback(() => {
    setLoading(true);
    fetchDashboard()
      .then((response) => {
        setData(response);
        setError(null);
      })
      .catch((err: Error) => {
        setError(`Unable to load dashboard data: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleReport = useCallback(() => {
    setReporting(true);
    window.setTimeout(() => setReporting(false), 1200);
  }, []);

  const handleUpload = useCallback(() => {
    setUploading(true);
    window.setTimeout(() => setUploading(false), 1200);
  }, []);

  useEffect(() => {
    loadDashboard();
    const interval = window.setInterval(loadDashboard, 60000);
    return () => window.clearInterval(interval);
  }, [loadDashboard]);

  const hasData = useMemo(() => data.potholes.length > 0, [data.potholes.length]);

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Header city={data.city} lastUpdated={data.updatedAt} onRefresh={loadDashboard} loading={loading} />
          <StatusFeedback loading={loading} error={error} hasData={hasData} />
          <OverviewCards summary={data.summary} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <MapPanel potholes={data.potholes} />
            </Grid>
            <Grid item xs={12} md={5}>
              <PredictionPanel predictions={data.predictions} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <VirtualSurveyor potholes={data.potholes} />
            </Grid>
            <Grid item xs={12} md={6}>
              <IntakePanel
                lastUpload="Today, 08:22"
                framesProcessed={1540}
                onUpload={handleUpload}
                loading={uploading}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <BudgetPlanner items={data.budgetPlan} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <PotholeTable potholes={data.potholes} />
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={2}>
                <ReportPanel generatedAt="Today, 07:50" onGenerate={handleReport} loading={reporting} />
                <ActivityFeed items={data.activityFeed} />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
