import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { DashboardSummary } from "../api/types";

interface OverviewCardsProps {
  summary: DashboardSummary;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

export default function OverviewCards({ summary }: OverviewCardsProps) {
  const budgetUsage = Math.min((summary.totalEstimatedCostInr / summary.budgetCapInr) * 100, 100);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="overline" color="text.secondary">
                Active potholes
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {summary.totalPotholes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {summary.highSeverityCount} high severity
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="overline" color="text.secondary">
                Average depth
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {summary.avgDepthCm.toFixed(1)} cm
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Depth Anything V2 estimates
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="overline" color="text.secondary">
                Estimated spend
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {formatCurrency(summary.totalEstimatedCostInr)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Budget cap {formatCurrency(summary.budgetCapInr)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="overline" color="text.secondary">
                Budget utilization
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {budgetUsage.toFixed(0)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Optimized repair allocation
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
