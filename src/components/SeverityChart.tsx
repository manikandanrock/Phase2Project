import { Card, CardContent, Stack, Typography } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { PotholeSummary } from "../api/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface SeverityChartProps {
  summary: PotholeSummary;
}

export default function SeverityChart({ summary }: SeverityChartProps) {
  const data = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Findings",
        data: [summary.bySeverity.LOW, summary.bySeverity.MEDIUM, summary.bySeverity.HIGH],
        backgroundColor: ["#4CAF50", "#FFB74D", "#EF5350"],
        borderRadius: 6
      }
    ]
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="overline" color="text.secondary">
            Severity distribution
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Active pothole severity mix
          </Typography>
        </Stack>
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
          }}
        />
      </CardContent>
    </Card>
  );
}
