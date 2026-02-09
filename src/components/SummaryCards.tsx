import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { PotholeSummary } from "../api/types";

interface SummaryCardsProps {
  summary: PotholeSummary;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);

export default function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="overline" color="text.secondary">
                Total potholes
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {summary.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Across all inspected corridors
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="overline" color="text.secondary">
                Estimated remediation cost
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {formatCurrency(summary.totalCost)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Based on current severity model
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="overline" color="text.secondary">
                High severity findings
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {summary.highCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Require immediate scheduling
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
