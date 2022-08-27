import { Box, Container } from "@mui/material";
import { DashboardLayout } from "src/layout/dashboard-layout";
import Breadcrumb from "@/common/BreadCrumb";
import Seo from "@/common/Seo";

const BCrumb = [
  { to: "/admin", title: "Inicio" },
  { to: "/admin/customer", title: "Clientes" },
  { title: "Información del cliente" },
];

const Detail = (props) => {
  return (
    <DashboardLayout>
      <Seo title="Detalle del cliente" description="Detalle del cliente" />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth={false}>
          <Box component="main" sx={{ mt: 2, flexGrow: 1 }}>
            <Breadcrumb title="Información del cliente" items={BCrumb} />
          </Box>
          {props.detail}
        </Container>
      </Box>
    </DashboardLayout>
  );
};

Detail.getInitialProps = async (ctx) => {
  const { detail } = ctx.query;
  return { detail };
};

export default Detail;
