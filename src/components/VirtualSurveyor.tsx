import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Pothole } from "../api/types";

interface VirtualSurveyorProps {
  potholes: Pothole[];
}

const formatKg = (value: number) => `${Math.round(value)} kg`;

const estimateAsphaltKg = (areaSqm: number, depthCm: number) => {
  const depthMeters = depthCm / 100;
  const densityKgPerM3 = 2400;
  return areaSqm * depthMeters * densityKgPerM3;
};

export default function VirtualSurveyor({ potholes }: VirtualSurveyorProps) {
  const topFindings = potholes.slice(0, 3);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Virtual surveyor
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Depth estimation & asphalt demand
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Depth Anything V2 estimates depth from monocular video to calculate asphalt volume.
          </Typography>
        </Stack>
        <Stack spacing={2}>
          {topFindings.map((pothole) => {
            const asphaltKg = estimateAsphaltKg(pothole.areaSqm, pothole.depthCm);
            return (
              <Stack key={pothole.id} spacing={0.5}>
                <Typography fontWeight={600}>{pothole.roadName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Depth {pothole.depthCm.toFixed(1)} cm · Area {pothole.areaSqm.toFixed(2)} sqm · Estimated asphalt {formatKg(asphaltKg)}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}
