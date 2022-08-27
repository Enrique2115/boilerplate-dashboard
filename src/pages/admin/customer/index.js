import { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Container, CircularProgress } from "@mui/material";
import { DashboardLayout } from "src/layout/dashboard-layout";
// import { getClients } from "src/Api/ClientApi";
import { useRouter } from "next/router";
import Seo from "@/common/Seo";

const CustomerListToolbar = dynamic(() =>
  import("src/components/admin/customer/customer-list-toolbar")
);

const CustomerListResults = dynamic(
  () => import("src/components/admin/customer/customer-list-results"),
  {
    loading: () => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
      </Box>
    ),
  }
);

/* A mock data to simulate the response of the API.. */
const listClients = [
  {
    id: 1,
    name: "Juan",
    lastName: "Perez",
    document: "72040073",
    phone: "123456789",
    email: "juan@gmail.com",
    address: "Direccion de Juan",
  },
  {
    id: 2,
    name: "Luis",
    lastName: "Espinoza",
    document: "03107420",
    phone: "648923456",
    email: "luis@gmail.com",
    address: "Direccion de Luis",
  },
  {
    id: 3,
    name: "Rosa",
    lastName: "Alvarez",
    document: "80388815",
    phone: "412379456",
    email: "rosa@gmail.com",
    address: "Direccion de Rosa",
  },
];

export default function Customers() {
  const [clients, setClients] = useState(listClients);
  const [searchStr, setSearchStr] = useState("");

  const router = useRouter();
  // console.log(router.route);

  /**
   * It returns a list of clients that have a name or last name that contains the search string.
   * @param list - the list of clients
   * @returns The filtered list of clients.
   */
  const searchColums = ["name", "lastName"];

  function search(list) {
    return list.filter((client) =>
      searchColums.some((column) => {
        return client[column].toLowerCase().includes(searchStr.toLowerCase());
      })
    );
  }

  return (
    <DashboardLayout>
      <Seo title="Clientes" description="Lista de clientes" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar callback={setSearchStr} />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults listClient={search(clients)} />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
