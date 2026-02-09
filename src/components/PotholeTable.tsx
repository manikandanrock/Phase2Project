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
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);

export default function PotholeTable({ potholes }: PotholeTableProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Inspection log
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Latest pothole detections
          </Typography>
        </Stack>
        <Table size="small" aria-label="pothole table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell align="right">Estimated cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {potholes.map((pothole) => (
              <TableRow key={pothole.id}>
                <TableCell>{pothole.id}</TableCell>
                <TableCell>
                  <Chip label={pothole.severity} color={severityColor(pothole.severity)} size="small" />
                </TableCell>
                <TableCell align="right">{formatCurrency(pothole.cost)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
