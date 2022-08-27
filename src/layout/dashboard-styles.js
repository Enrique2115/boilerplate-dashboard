import { alpha } from "@mui/material/styles";

// Styles for navbar
const navBarRoot = {
  left: {
    lg: 280,
  },
  width: {
    lg: "calc(100% - 280px)",
  },
};

const navbarToolbar = {
  minHeight: 64,
  left: 0,
  px: 2,
};

const navbarMenu = {
  display: {
    xs: "inline-flex",
    lg: "none",
  },
};

const navbarTheme = {
  display: "flex",
  alignItems: "center",
  bgcolor: "background.default",
  color: "text.primary",
  borderRadius: 1,
};

const navbarAvatar = (open) => {
  return {
    p: 0,
    ...(open && {
      "&:before": {
        zIndex: 1,
        content: "''",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        position: "absolute",
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
      },
    }),
  };
};

const navbarMenuPopOver = {
  p: 0,
  mt: 1.5,
  ml: 0.75,
  "& .MuiMenuItem-root": {
    typography: "body2",
    borderRadius: 0.75,
  },
};

//Styles for sidebar
const sidebarRoot = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const sidebarHeader = {
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.04)",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  px: 3,
  py: "11px",
  borderRadius: 1,
};

const sidebarDrawer = {
  backgroundColor: "neutral.900",
  color: "#FFFFFF",
  width: 280,
};

//Styles for navs
const navItemRoot = {
  display: "flex",
  mb: 0.5,
  py: 0,
  px: 2,
};

const navItemButton = (active) => {
  return {
    backgroundColor: active && "rgba(255,255,255, 0.08)",
    borderRadius: 1,
    color: active ? "secondary.main" : "neutral.300",
    fontWeight: active && "fontWeightBold",
    justifyContent: "flex-start",
    px: 3,
    textAlign: "left",
    textTransform: "none",
    width: "100%",
    "& .MuiButton-startIcon": {
      color: active ? "secondary.main" : "neutral.400",
    },
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.08)",
    },
  };
};

const navGroupRoot = {
  display: "flex",
  mb: 0.5,
  py: 0,
  pl: 5,
};

const navGroupButton = {
  borderRadius: 1,
  color: "neutral.300",
  justifyContent: "flex-start",
  pl: 3,
  textAlign: "left",
  textTransform: "none",
  width: "100%",
  "&:hover": {
    backgroundColor: "rgba(255,255,255, 0.08)",
  },
};

export {
  navBarRoot,
  navbarToolbar,
  navbarMenu,
  navbarTheme,
  navbarAvatar,
  navbarMenuPopOver,
  sidebarRoot,
  sidebarHeader,
  sidebarDrawer,
  navItemRoot,
  navItemButton,
  navGroupRoot,
  navGroupButton,
};
