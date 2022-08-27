import { Box, Button, Container, Card, CardContent, Typography, Stack } from "@mui/material";
import { Formik, Form } from "formik";
import React from "react";
import CustomizedProgressBars from "src/components/common/loading";
import Seo from "@/common/Seo";
import { InputField } from "@/common/FormFields";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { recoverPassword } from "src/store/reducers/auth/auth.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const SendNewPassword = ({ token }) => {
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = { password: "", confirm: "" };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Este campo es requerido"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Este campo es requerido"),
  });

  const handleSubmit = async (values, actions) => {
    const data = {
      password: values.password,
      token,
    };
    const response = await dispatch(recoverPassword(data));

    console.log(response);
    if (response.error) {
      toast.error(response.payload);
    } else {
      toast.success(response.payload.message);
      router.push("/login");
    }
  };

  return (
    <>
      <Seo title="Generar Nueva Contraseña" />
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
                      Genere nueva contraseña
                    </Typography>
                  </Box>

                  <InputField
                    name="password"
                    label="Nueva Contraseña"
                    type="password"
                    margin="normal"
                    fullWidth
                    autoComplete="new-password"
                  />

                  <InputField
                    name="confirm"
                    label="Confirmar Contraseña"
                    type="password"
                    margin="normal"
                    fullWidth
                    autoComplete="new-password"
                  />

                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {loading ? <CustomizedProgressBars /> : <Box>Cambiar Contraseña</Box>}
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

export default SendNewPassword;
