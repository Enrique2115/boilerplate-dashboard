import { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { InputField } from "../common/FormFields";
import * as Yup from "yup";

export default function AccountProfileDetails(props) {
  const [values, setValues] = useState({
    firstName: "Luis Enrique",
    lastName: "Morocho Febres",
    email: "lmorochofebres@gmail.com",
    phone: "123456789",
    state: "Piura",
    country: "PERÚ",
  });

  function initialValues() {
    return {
      firstName: `${values.firstName}`,
      lastName: `${values.lastName}`,
      email: `${values.email}`,
      phone: `${values.phone}`,
      state: `${values.state}`,
      country: `${values.country}`,
    };
  }

  function validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required("El nombre es requerido"),
      lastName: Yup.string().required("El apellido es requerido"),
      email: Yup.string().required("El email es requerido").email("El email es inválido"),
      phone: Yup.string().required("El teléfono es requerido"),
      state: Yup.string().required("El estado es requerido"),
      country: Yup.string().required("El país es requerido"),
    });
  }

  async function handleSubmit(values, actions) {
    console.log(values, "values");
  }

  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={validationSchema()}
      onSubmit={handleSubmit}
    >
      <Form>
        <Card>
          <CardHeader subheader="La información se puede editar" title="Perfil" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <InputField name="firstName" label="Nombres" fullWidth />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputField name="lastName" label="Apellidos" fullWidth />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputField name="email" label="Correo Electronico" fullWidth />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputField name="phone" label="N° Celular" fullWidth />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputField name="country" label="Pais" fullWidth />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputField name="state" label="Ciudad" fullWidth />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button color="primary" type="submit" variant="contained">
              Guardar Cambios
            </Button>
          </Box>
        </Card>
      </Form>
    </Formik>

    // <form autoComplete="off" noValidate {...props}>

    // </form>
  );
}
