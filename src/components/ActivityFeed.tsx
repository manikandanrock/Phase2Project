import { Card, CardContent, Stack, Typography } from "@mui/material";

interface ActivityFeedProps {
  items: string[];
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Operations feed
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Live system updates
          </Typography>
        </Stack>
        <Stack spacing={1.5}>
          {items.map((item, index) => (
            <Typography key={`${item}-${index}`} variant="body2" color="text.secondary">
              {item}
            </Typography>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
