import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, ListItem } from "@mui/material";
import { navItemButton, navItemRoot } from "./dashboard-styles";

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  return (
    <ListItem disableGutters sx={navItemRoot} {...others}>
      <NextLink href={href} passHref>
        <Button component="a" startIcon={icon} disableRipple sx={navItemButton(active)}>
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
