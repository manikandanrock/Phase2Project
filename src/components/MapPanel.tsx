import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Pothole } from "../api/types";

interface MapPanelProps {
  potholes: Pothole[];
}

export default function MapPanel({ potholes }: MapPanelProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            City heatmap
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Red zone clusters (mocked layer)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Integrate Leaflet in production with GPS coordinates from each detection.
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ bgcolor: "#f3f4f6", borderRadius: 2, p: 2, height: 220 }}>
          {potholes.map((pothole) => (
            <Typography key={pothole.id} variant="body2">
              {pothole.roadName} · {pothole.severity} · {pothole.depthCm} cm
            </Typography>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
