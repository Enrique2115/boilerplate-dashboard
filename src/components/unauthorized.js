import NextLink from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Seo from "@/common/Seo";
import { useSelector } from "react-redux";
const Unauthorized = () => {
  const { authInfo } = useSelector((state) => state.auth);

  const routes = authInfo?.role === "admin" ? "/admin" : "/employee";
  return (
    <>
      <Seo title="No Autorizado" description="Página con acceso restringido " />
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          paddingTop: 10,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <img
                alt="Under development"
                src="/static/images/unauthorized.png"
                style={{
                  display: "inline-block",
                  width: "auto",
                  height: "auto",
                }}
              />
            </Box>
            <Typography align="center" color="textPrimary" variant="h4">
              No tienes permisos para acceder a esta página
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle4">
              La página a la que intenta acceder tiene acceso restringido. Si cree <br />
              que se trata de un error, pongase en contacto con el administrador.
            </Typography>
            {/* <NextLink href={routes} passHref>
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
                sx={{ mt: 3 }}
                variant="contained"
              >
                Volver al Dashboard
              </Button>
            </NextLink> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Unauthorized;
