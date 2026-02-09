import {
  Card,
  CardContent,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { Pothole } from "../api/types";

interface PotholeTableProps {
  potholes: Pothole[];
}

const severityColor = (severity: Pothole["severity"]) => {
  if (severity === "HIGH") return "error";
  if (severity === "MEDIUM") return "warning";
  return "success";
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric"
  });

export default function PotholeTable({ potholes }: PotholeTableProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Detection log
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Latest pothole detections
          </Typography>
        </Stack>
        <Table size="small" aria-label="pothole table">
          <TableHead>
            <TableRow>
              <TableCell>Road</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Depth</TableCell>
              <TableCell align="right">Cost (INR)</TableCell>
              <TableCell>Detected</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {potholes.map((pothole) => (
              <TableRow key={pothole.id}>
                <TableCell>{pothole.roadName}</TableCell>
                <TableCell>
                  <Chip label={pothole.severity} color={severityColor(pothole.severity)} size="small" />
                </TableCell>
                <TableCell>{pothole.depthCm.toFixed(1)} cm</TableCell>
                <TableCell align="right">{formatCurrency(pothole.estimatedCostInr)}</TableCell>
                <TableCell>{formatDateTime(pothole.detectedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
