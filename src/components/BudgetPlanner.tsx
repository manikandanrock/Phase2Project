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
import { BudgetPlanItem } from "../api/types";

interface BudgetPlannerProps {
  items: BudgetPlanItem[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

const priorityColor = (priority: BudgetPlanItem["priority"]) => {
  if (priority === "Critical") return "error";
  if (priority === "High") return "warning";
  return "info";
};

export default function BudgetPlanner({ items }: BudgetPlannerProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Budget planner
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Knapsack-optimized repair list
          </Typography>
        </Stack>
        <Table size="small" aria-label="budget plan table">
          <TableHead>
            <TableRow>
              <TableCell>Road</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell align="right">Cost (INR)</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.roadName}</TableCell>
                <TableCell>
                  <Chip label={item.priority} color={priorityColor(item.priority)} size="small" />
                </TableCell>
                <TableCell align="right">{formatCurrency(item.estimatedCostInr)}</TableCell>
                <TableCell>{item.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
