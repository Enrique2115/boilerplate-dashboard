import { useState, useEffect } from "react";

// Import next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Import components from @mui/material
import {
  Box,
  Container,
  Grid,
  Button,
  Autocomplete,
  CircularProgress,
  Card,
  Stack,
  FormHelperText,
} from "@mui/material";

// import { getProveedores, uploadImageRepuesto, addProduct } from "src/Api/RepuestoApi";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { size } from "lodash";
import { toast } from "react-toastify";

// Import Local Components
import Breadcrumb from "@/common/BreadCrumb";
import { DashboardLayout } from "src/layout/dashboard-layout";
import { InputField } from "@/common/FormFields";
import { MultiFileUpload } from "@/common/UploadFile";
import Seo from "@/common/Seo";

const ListProductTable = dynamic(() =>
  import("src/components/admin/product/Register/ListProductTable")
);

const BCrumb = [
  { to: "/admin", title: "Inicio" },
  { to: "/admin/product", title: "Productos" },
  { title: "Crear Producto" },
];

export default function RegisterProduct() {
  const [listProveedores, setListProveedores] = useState([]);
  const [itemsProducts, setItemsProducts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      //   const response = await getProveedores();
      //   setListProveedores(response);
    })();
  }, []);

  function initialValues() {
    return {
      product: "",
      stock: "",
      made: "",
      precio_compra: "",
      precio_venta: "",
      id_proveedor: "",
      imgsRepuestos: null,
    };
  }

  function validationSchema() {
    return Yup.object().shape({
      //   product: Yup.string().required("Se requiere el nombre del producto"),
      //   stock: Yup.string()
      //     .required("Se requiere el stock del producto")
      //     .test("Positive", "El stock debe ser un numero positivo", (value) => {
      //       return value > 0;
      //     }),
      //   made: Yup.string().required("Se requiere la marca del repuesto"),
      //   precio_compra: Yup.string()
      //     .required("Se requiere el precio de compra")
      //     .test("Positive", "El precio de compra debe ser un numero decimal Ej. 10.5", (value) => {
      //       return value > 0;
      //     }),
      //   precio_venta: Yup.string()
      //     .required("Se requiere el precio de venta")
      //     .test("Positive", "El precio de venta debe ser un numero decimal Ej. 10.5", (value) => {
      //       return value > 0;
      //     }),
      //   id_proveedor: Yup.string().required("Se requiere el proveedor"),
      imgsRepuestos: Yup.mixed()
        .nullable()
        .required("Se requieren las imagenes del producto")
        .test("len", `Solo permite 4 imagenes`, (val) => val && val.length === 4),
    });
  }

  async function _handleSubmit(values, actions) {
    console.log(values);
    // const response = await uploadImageRepuesto("repuestos", values.imgsRepuestos);
    // // console.log(JSON.stringify(response.data));
    // const dataProcessed = {
    //   product: values.product,
    //   stock: values.stock,
    //   made: values.made,
    //   precio_compra: values.precio_compra,
    //   precio_venta: values.precio_venta,
    //   id_proveedor: values.id_proveedor,
    //   imgsRepuestos: JSON.stringify(response.data),
    // };
    // // console.log(dataProcessed);
    // setItemsProducts([...itemsProducts, dataProcessed]);
    // //limpio el array de imagenes seleccionadas para que nos las siga acoplando
    // actions.setSubmitting(false);
    actions.resetForm();
  }

  async function register() {
    console.log(itemsProducts);
    if (size(itemsProducts) > 0) {
      const response = await addProduct(itemsProducts);

      console.log(response);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/products");
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("No hay productos para registrar");
    }
  }

  return (
    <DashboardLayout>
      <Seo title="Crear Producto" description="Apartado para crear un producto" />
      <Box
        component="main"
        sx={{ flexGrow: 1, alignItems: "top", display: "flex", minHeight: "100%" }}
      >
        <Container maxWidth={false}>
          <Box component="main" sx={{ mt: 2, flexGrow: 1 }}>
            <Breadcrumb title="Registrar nuevo Producto" items={BCrumb} />
          </Box>
          <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema()}
            onSubmit={_handleSubmit}
          >
            {(formik) => (
              <Form>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {/* Imagenes */}
                  <Grid item xs={6}>
                    <Card>
                      <Stack spacing={1.5} alignItems="center">
                        <MultiFileUpload
                          field="imgsRepuestos"
                          setFieldValue={formik.setFieldValue}
                          files={formik.values.imgsRepuestos}
                          error={formik.touched.imgsRepuestos && !!formik.errors.imgsRepuestos}
                        />
                        {formik.touched.imgsRepuestos && formik.errors.imgsRepuestos && (
                          <FormHelperText error>{formik.errors.imgsRepuestos}</FormHelperText>
                        )}
                      </Stack>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    {/* Proveedor */}
                    <Autocomplete
                      id="id_proveedor"
                      freeSolo
                      name="id_proveedor"
                      options={listProveedores}
                      getOptionLabel={(option) => option.nombre}
                      onOpen={formik.handleBlur}
                      onChange={(event, newValue) => {
                        // console.log(newValue);
                        formik.setFieldValue(
                          "id_proveedor",
                          newValue !== null ? newValue.id : initialValues().id_proveedor
                        );
                      }}
                      renderInput={(params) => (
                        <InputField
                          label="Buscar Proveedor"
                          fullWidth
                          name="id_proveedor"
                          {...params}
                        />
                      )}
                    />

                    {/* Nombre de producto */}
                    <InputField name="product" label="Nombre" margin="normal" fullWidth />

                    {/* Stock - Marca */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <InputField
                        name="stock"
                        label="Stock"
                        margin="normal"
                        type="number"
                        fullWidth
                      />
                      <InputField name="made" label="Marca" margin="normal" fullWidth />
                    </Grid>

                    {/* Precios */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <InputField
                        name="precio_compra"
                        label="Precio Compra"
                        margin="normal"
                        fullWidth
                      />
                      <InputField
                        name="precio_venta"
                        label="Precio Venta"
                        margin="normal"
                        fullWidth
                      />
                    </Grid>

                    <Button variant="contained" type="submit" color="secondary" fullWidth>
                      Agregar producto
                    </Button>
                  </Grid>
                </Grid>

                {size(itemsProducts) > 0 && (
                  <Box mt={3}>
                    <ListProductTable items={itemsProducts} callback={setItemsProducts} />
                  </Box>
                )}

                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" color="primary" onClick={() => register()} fullWidth>
                    Registrar
                  </Button>
                </Box>
                {formik.isSubmitting && (
                  <CircularProgress
                    size={24}
                    sx={{ position: "absolute", top: "50%", left: "50%" }}
                  />
                )}
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
