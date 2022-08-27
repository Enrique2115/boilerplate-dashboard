import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Container, Grid, CircularProgress } from "@mui/material";
import { DashboardLayout } from "src/layout/dashboard-layout";
import Seo from "@/common/Seo";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const TotalCustomers = dynamic(() => import("src/components/admin/dashboard/total-customers"));
const TotalConvertions = dynamic(() => import("src/components/admin/dashboard/total-convertions"));

export default function Dashboard() {
  const [totalClients, setTotalClients] = useState();
  const [totalConvertions, setTotalConvertions] = useState();
  const { authInfo } = useSelector((state) => state.auth);

  const router = useRouter();

  // useEffect(() => {
  //   if (authInfo?.roles?.includes("employee")) {
  //     router.push("/employee");
  //   }
  // }, [authInfo, router]);

  // useEffect(() => {
  //   getData();
  // }, []);

  async function getData() {
    const response = await getTotalClients();
    setTotalClients(response);

    const response2 = await getTotalConvertions();
    setTotalConvertions(response2);
  }

  return (
    <DashboardLayout>
      <Seo title="Dashboard" description="Dashboard con metricas del negocio" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TotalCustomers callback={totalClients} />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TotalConvertions callback={totalConvertions} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}></Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
