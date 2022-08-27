import { ChartBar as ChartBarIcon } from "src/icons/chart-bar";
import { UserAdd as UserAddIcon } from "src/icons/user-add";

export const routesEmployee = [
  {
    href: "/employee/orders",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Ordenes",
    type: "item",
  },
  {
    href: "/employee/other",
    icon: <UserAddIcon fontSize="small" />,
    title: "otros",
    type: "item",
  },
];
