import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";

interface HeaderProps {
  city: string;
  lastUpdated: string;
  onRefresh: () => void;
  loading: boolean;
}

const formatUpdated = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric"
  });

export default function Header({ city, lastUpdated, onRefresh, loading }: HeaderProps) {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ px: { xs: 0, md: 2 }, py: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="overline" color="text.secondary">
            Gov-RoadAI
          </Typography>
          <Typography variant="h4" fontWeight={600}>
            {city || "Pothole Operations Dashboard"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Depth estimation, predictive maintenance, and budget planning in one view.
          </Typography>
        </Box>
        <Stack spacing={1} alignItems="flex-end">
          <Typography variant="body2" color="text.secondary">
            Last updated: {formatUpdated(lastUpdated)}
          </Typography>
          <Button variant="contained" onClick={onRefresh} disabled={loading}>
            {loading ? "Refreshing" : "Refresh data"}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
