import { useEffect, useMemo, useState } from "react";
import { Box, Container, CssBaseline, Grid, Stack } from "@mui/material";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import SeverityChart from "./components/SeverityChart";
import PotholeTable from "./components/PotholeTable";
import StatusFeedback from "./components/StatusFeedback";
import { fetchPotholes } from "./api/potholes";
import { Pothole, PotholeSummary } from "./api/types";

const summarize = (potholes: Pothole[]): PotholeSummary => {
  const bySeverity: PotholeSummary["bySeverity"] = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0
  };

  const totalCost = potholes.reduce((sum, pothole) => {
    bySeverity[pothole.severity] += 1;
    return sum + pothole.cost;
  }, 0);

  return {
    total: potholes.length,
    totalCost,
    highCount: bySeverity.HIGH,
    bySeverity
  };
};

function App() {
  const [potholes, setPotholes] = useState<Pothole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchPotholes()
      .then((data) => {
        if (active) {
          setPotholes(data);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (active) {
          setError(`Unable to load pothole data: ${err.message}`);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const summary = useMemo(() => summarize(potholes), [potholes]);

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Header />
          <StatusFeedback loading={loading} error={error} hasData={potholes.length > 0} />
          <SummaryCards summary={summary} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <SeverityChart summary={summary} />
            </Grid>
            <Grid item xs={12} md={7}>
              <PotholeTable potholes={potholes} />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
