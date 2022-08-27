import dynamic from "next/dynamic";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/layout/dashboard-layout";
import Seo from "@/common/Seo";
const SettingsPassword = dynamic(() => import("src/components/admin/settings/settings-password"));

export default function Settings() {
  return (
    <DashboardLayout>
      <Seo title="Configuraciones" description="Configuraciones de la cuenta" />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Configuracion
          </Typography>
          <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
