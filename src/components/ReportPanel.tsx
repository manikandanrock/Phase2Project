import { Card, CardContent, Stack, Typography, Button } from "@mui/material";

interface ReportPanelProps {
  generatedAt: string;
  onGenerate: () => void;
  loading: boolean;
}

export default function ReportPanel({ generatedAt, onGenerate, loading }: ReportPanelProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Contractor report
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            PDF work order packet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Export a PDF with depth, cost, and priority roads for contractor bidding.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Last generated: {generatedAt}
          </Typography>
          <Button variant="contained" onClick={onGenerate} disabled={loading}>
            {loading ? "Generating…" : "Download PDF report"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
