import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { routesAdmin, routesEmployee } from "src/routes";
import { useSelector } from "react-redux";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const { authInfo } = useSelector((state) => state.auth);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  let rutas = [];

  if (authInfo?.role) {
    rutas = authInfo?.role === "employee" ? routesEmployee : routesAdmin;
  }

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar items={rutas} onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};
