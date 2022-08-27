import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { InputField, SelectField } from "src/components/common/FormFields";

/* A mock data to simulate the response of the API. */
const type_document = [
  {
    id: 1,
    nombre: "DNI",
  },
  {
    id: 2,
    nombre: "Pasaporte",
  },
  {
    id: 3,
    nombre: "Cedula de Extranjeria",
  },
];

export default function PersonalInformation(props) {
  const {
    formField: { firstName, lastName, tipo_document, document },
  } = props;

  const [tipoDocument, setTipoDocument] = useState(type_document);

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6}>
          <InputField name={firstName.name} label={firstName.label} variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <InputField name={lastName.name} label={lastName.label} variant="outlined" fullWidth />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={6}>
          <SelectField
            name={tipo_document.name}
            label={tipo_document.label}
            data={tipoDocument}
            fullWidth
          />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={6}>
          <InputField name={document.name} label={document.label} variant="outlined" fullWidth />
        </Grid>
      </Grid>
    </>
  );
}
