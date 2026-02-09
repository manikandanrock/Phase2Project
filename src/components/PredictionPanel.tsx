import { Card, CardContent, Stack, Typography } from "@mui/material";
import { RoadPrediction } from "../api/types";

interface PredictionPanelProps {
  predictions: RoadPrediction[];
}

const formatPercent = (value: number) => `${Math.round(value * 100)}%`;

export default function PredictionPanel({ predictions }: PredictionPanelProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Predictive maintenance
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Roads at risk in the next 60 days
          </Typography>
        </Stack>
        <Stack spacing={2}>
          {predictions.map((prediction) => (
            <Stack key={prediction.id} spacing={0.5}>
              <Typography fontWeight={600}>{prediction.roadName}</Typography>
              <Typography variant="body2" color="text.secondary">
                Failure risk {formatPercent(prediction.riskScore)} · Expected in {prediction.predictedFailureDays} days ·
                Crack density {formatPercent(prediction.crackDensity)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
