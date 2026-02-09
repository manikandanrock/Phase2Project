import { Card, CardContent, Stack, Typography, Button } from "@mui/material";

interface IntakePanelProps {
  lastUpload: string;
  framesProcessed: number;
  onUpload: () => void;
  loading: boolean;
}

export default function IntakePanel({ lastUpload, framesProcessed, onUpload, loading }: IntakePanelProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Video intake
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Survey upload pipeline
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload dashcam footage for AI processing (YOLOv8 + Depth Anything V2).
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Last upload: {lastUpload}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Frames processed: {framesProcessed}
          </Typography>
          <Button variant="outlined" onClick={onUpload} disabled={loading}>
            {loading ? "Uploading…" : "Upload survey video"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
