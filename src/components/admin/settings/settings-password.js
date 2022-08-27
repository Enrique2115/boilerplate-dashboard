import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { Form, Formik } from "formik";
import { InputField } from "src/components/common/FormFields";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, logout } from "src/store/reducers/auth/auth.actions";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";

export default function SettingsPassword(props) {
  const { authInfo, loading } = useSelector((state) => state.auth);

  const dispach = useDispatch();
  const router = useRouter();

  function initialValues() {
    return {
      oldPassword: "",
      password: "",
      confirm: "",
    };
  }

  function validationSchema() {
    return Yup.object({
      oldPassword: Yup.string().required("Este campo es requerido"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("Este campo es requerido"),
      confirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
        .required("Este campo es requerido"),
    });
  }

  const _handleSubmit = async (values, actions) => {
    const response = await dispach(
      changePassword({
        oldPassword: values.oldPassword,
        password: values.password,
        id_user: authInfo?.id,
      })
    );

    // console.log(response);

    if (response.error) {
      toast.error(response.payload);
    } else {
      toast.success(`${response.payload.message}, por favor inicia sesión nuevamente`);
      dispach(logout());
      router.push("/login");
    }
  };

  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={validationSchema()}
      onSubmit={_handleSubmit}
    >
      <Form>
        <Card>
          <CardHeader subheader="Actualiza tu Contraseña" title="Contraseña" />
          <Divider />
          <CardContent>
            <InputField
              name="oldPassword"
              label="Contraseña Actual"
              type="password"
              margin="normal"
              fullWidth
            />

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
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <LoadingButton loading={loading} type="submit" color="primary" variant="contained">
              Actualizar
            </LoadingButton>
          </Box>
        </Card>
      </Form>
    </Formik>
  );
}
