import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { navItemButton, navGroupButton, navGroupRoot, navItemRoot } from "./dashboard-styles";
import { Box, Button, Collapse, List, ListItem } from "@mui/material";

const NavGroup = ({ item }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleClick = () => setOpen(!open);

  return (
    <>
      <ListItem disableGutters onClick={handleClick} sx={navItemRoot}>
        <Button component="a" startIcon={item.icon} disableRipple sx={navGroupButton}>
          <Box sx={{ flexGrow: 1 }}>{item.title}</Box>
          {open ? <ExpandLess /> : <ExpandMore />}
        </Button>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {item.children.map((item) => {
          const active = item.href ? router.pathname === item.href : false;

          return (
            <ListItem button key={item.title} sx={navGroupRoot}>
              <Link href={item.href} passHref>
                <Button
                  component="a"
                  startIcon={item.icon}
                  disableRipple
                  sx={navItemButton(active)}
                >
                  <Box sx={{ flexGrow: 1 }}>{item.title}</Box>
                </Button>
              </Link>
            </ListItem>
          );
        })}
      </Collapse>
    </>
  );
};

export default NavGroup;
