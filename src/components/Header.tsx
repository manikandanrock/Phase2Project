import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ px: { xs: 0, md: 2 }, py: 2 }}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Gov-RoadAI
          </Typography>
          <Typography variant="h4" fontWeight={600}>
            Pothole Operations Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Live visibility into road condition findings and remediation costs.
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
