import { Alert, CircularProgress, Stack, Typography } from "@mui/material";

interface StatusFeedbackProps {
  loading: boolean;
  error: string | null;
  hasData: boolean;
}

export default function StatusFeedback({ loading, error, hasData }: StatusFeedbackProps) {
  if (loading) {
    return (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 4 }}>
        <CircularProgress size={28} />
        <Typography>Loading Gov-RoadAI intelligence…</Typography>
      </Stack>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!hasData) {
    return <Alert severity="info">No detections available. Check data ingestion status.</Alert>;
  }

  return null;
}
