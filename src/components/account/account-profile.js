import { Box, Button, Card, CardContent, Divider, FormHelperText, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AvatarFileUpload } from "../common/UploadFile";

const user = {
  avatar: "/static/images/avatars/account.png",
  role: "Administrador",
  username: "LMOROCHO",
  email: "lmorochofebres@gmail.com",
};

export default function AccountProfile(props) {
  function initialValues() {
    return {
      imgUser: null,
    };
  }

  function validationSchema() {
    return Yup.object().shape({
      imgUser: Yup.mixed().required("Seleccione una imagen").nullable(),
    });
  }

  function handleSubmit(values, actions) {
    console.log(values, "values");
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <AvatarFileUpload
                    field="imgUser"
                    setFieldValue={formik.setFieldValue}
                    file={formik.values.imgUser}
                    error={formik.touched.imgUser && !!formik.errors.imgUser}
                  />
                  {formik.touched.imgUser && formik.errors.imgUser && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {formik.errors.imgUser}
                    </FormHelperText>
                  )}
                </Box>

                <Box sx={{ my: 2 }}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Actualizar Imagen
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Typography color="textPrimary" gutterBottom variant="h5">
            {user.username}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.role}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
}
