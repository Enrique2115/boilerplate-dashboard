import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

export const MENU_OPTIONS = (role) => {
  return [
    {
      title: "Home",
      icon: <HomeIcon />,
      href: role === "admin" ? "/admin" : "/employee/orders",
    },
    {
      title: "Cuenta",
      icon: <PersonIcon />,
      href: "/account",
    },
    {
      title: "Configuracion",
      icon: <SettingsIcon />,
      href: "/settings",
    },
  ];
};
