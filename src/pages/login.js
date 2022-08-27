import { useRouter } from "next/router";

import { Box, Button, Container, Card, CardContent, Typography, Stack } from "@mui/material";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { InputField } from "@/common/FormFields";
import Seo from "@/common/Seo";
import { login } from "src/store/reducers/auth/auth.actions";
import CustomizedProgressBars from "src/components/common/loading";
import Link from "next/link";

const Login = () => {
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string()
      // .email("Ingrese un correo valido")
      .max(255)
      .required("Este campo es requerido"),
    password: Yup.string().max(255).required("La contraseña es necesaria"),
  });

  const handleSubmit = async (values, actions) => {
    const response = await dispatch(login(values));

    if (response.error) {
      toast.error(response.payload);
    } else {
      toast.success("Bienvenido");
      response.payload.role === "admin"
        ? router.push("/admin")
        : response.payload.role === "employee"
        ? router.push("/employee/orders")
        : router.push("/");
    }
  };

  return (
    <>
      <Seo title="Iniciar Sesión" />
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          // backgroundImage: `url(${"/static/images/dashboard-background.jpg"})`,
          backgroundImage: `url(${"https://res.cloudinary.com/reymi/image/upload/q_auto,f_auto/v1651620934/dashboard-background_d3afvg.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Box sx={{ my: 3 }}>
                    <Typography color="textPrimary" variant="h4">
                      Inicia sesión
                    </Typography>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Inicia sesión en el Plataforma Admin
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      my: 3,
                    }}
                  >
                    <Typography align="center" color="textSecondary" variant="body1">
                      Inicie sesión con la dirección de correo electrónico
                    </Typography>
                  </Box>

                  <InputField
                    name="username"
                    label="Usuario"
                    margin="normal"
                    variant="outlined"
                    // type="email"
                    autoComplete="email"
                    fullWidth
                  />

                  <InputField
                    name="password"
                    label="Contraseña"
                    margin="normal"
                    variant="outlined"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                  />

                  <Box sx={{ my: 1 }}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center">
                      <Link href={"/recovery-password"} passHref>
                        <Typography
                          sx={{
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                          color="primary"
                          gutterBottom
                          variant="body2"
                        >
                          Recuperar contraseña
                        </Typography>
                      </Link>
                    </Stack>
                  </Box>

                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {loading ? <CustomizedProgressBars /> : <Box>Iniciar Sesión</Box>}
                    </Button>
                  </Box>
                </Form>
              </Formik>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
