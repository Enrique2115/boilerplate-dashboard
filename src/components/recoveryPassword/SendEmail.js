import { Box, Button, Container, Card, CardContent, Typography, Stack } from "@mui/material";
import { Formik, Form } from "formik";
import React from "react";
import CustomizedProgressBars from "src/components/common/loading";
import Seo from "@/common/Seo";
import { InputField } from "@/common/FormFields";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "src/store/reducers/auth/auth.actions";
import { toast } from "react-toastify";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SendEmail = () => {
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Ingrese un correo valido")
      .max(255)
      .required("Este campo es requerido"),
  });

  const handleSubmit = async (values, actions) => {
    const response = await dispatch(forgotPassword(values));

    console.log(response);
    if (response.error) {
      toast.error(response.payload);
    } else {
      toast.success(response.payload.message);
      actions.resetForm();
    }
  };

  return (
    <>
      <Seo title="Recuperar Contraseña" />
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
                    <Link href="/login" passHref>
                      <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
                        Volver
                      </Button>
                    </Link>
                    <Typography color="textPrimary" variant="h4">
                      Recuperar Contraseña
                    </Typography>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Ingrese el correo con el que se registro para recuperar su contraseña
                    </Typography>
                  </Box>

                  <InputField
                    name="email"
                    label="Correo"
                    margin="normal"
                    variant="outlined"
                    type="email"
                    autoComplete="email"
                    fullWidth
                  />

                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {loading ? (
                        <CustomizedProgressBars />
                      ) : (
                        <Box>Enviar correo de recuperación</Box>
                      )}
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

export default SendEmail;
