import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import MoneyIcon from "@mui/icons-material/Money";

export default function TotalConvertions(props) {
  const { callback } = props;

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent sx={{ diplay: "flex", alignItems: "center", height: "100%" }}>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Total de conversiones
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {callback?.total_convertions}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
