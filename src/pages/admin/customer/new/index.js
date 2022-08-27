import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { Box, Button, Container, Stepper, Step, StepLabel, CircularProgress } from "@mui/material";

import { DashboardLayout } from "src/layout/dashboard-layout";
import { map } from "lodash";

import {
  PersonalInformation,
  ContactInformation,
  VehicleInformation,
} from "src/components/admin/customer/new/Forms";

import {
  initialValues,
  validationSchema,
  customerFormModel,
} from "src/components/admin/customer/new/FormModel";
import Breadcrumb from "@/common/BreadCrumb";
import Seo from "@/common/Seo";

const steps = ["Informacion Personal", "Informacion de Contacto", "Informacion Vehicular"];
const { formId, formField } = customerFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalInformation formField={formField} />;
    case 1:
      return <ContactInformation formField={formField} />;
    case 2:
      return <VehicleInformation formField={formField} />;
    default:
      return <div>No encontrado</div>;
  }
}

const BCrumb = [
  { to: "/admin", title: "Inicio" },
  { to: "/admin/customer", title: "Clientes" },
  { title: "Cliente nuevo " },
];

export default function RegisterCustomer() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const router = useRouter();

  async function _submitForm(values, actions) {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
    router.push("/admin/customers");
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <DashboardLayout>
      <Seo title="Crear cliente" description="Registro de cliente" />

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
            <Breadcrumb title="Registrar nuevo Cliente" items={BCrumb} />
          </Box>
          <Box sx={{ my: 2 }}>
            <Stepper activeStep={activeStep} sx={{ my: 3 }}>
              {map(steps, (label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} sx={{ marginTop: "3px", marginLeft: "1px" }}>
                      Atras
                    </Button>
                  )}
                </Box>

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isLastStep ? "Registrar Cliente" : "Siguiente"}
                  </Button>
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      sx={{ position: "absolute", top: "50%", left: "50%" }}
                    />
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
