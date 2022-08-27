import { ChartBar as ChartBarIcon } from "src/icons/chart-bar";
import { UserAdd as UserAddIcon } from "src/icons/user-add";

import GridView from "@mui/icons-material/GridView";
import InventoryIcon from "@mui/icons-material/Inventory";
import Location from "@mui/icons-material/LocationSearching";
import Category from "@mui/icons-material/Category";

export const routesAdmin = [
  {
    href: "/admin",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
    type: "item",
  },
  {
    href: "/admin/customer",
    icon: <UserAddIcon fontSize="small" />,
    title: "Clientes",
    type: "item",
  },
  {
    href: "/admin/product",
    icon: <GridView fontSize="small" />,
    title: "Productos/Servicios",
    type: "group",
    children: [
      {
        href: "/admin/product",
        icon: <InventoryIcon fontSize="small" />,
        title: "Productos",
        type: "item",
      },
      {
        href: "/admin/product/category",
        icon: <Category fontSize="small" />,
        title: "Categorias",
        type: "item",
      },
      {
        href: "/admin/product/zones",
        icon: <Location fontSize="small" />,
        title: "Zonas",
        type: "item",
      },
    ],
  },
];
