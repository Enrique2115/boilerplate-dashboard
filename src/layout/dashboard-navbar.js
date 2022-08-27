import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";

import MenuPopover from "src/components/MenuPopOver/MenuPopover";
import { MENU_OPTIONS } from "src/routes/menu_options";
import { logout } from "src/store/reducers/auth/auth.actions";
import { Bell as BellIcon } from "src/icons/bell";

import {
  navBarRoot,
  navbarToolbar,
  navbarMenu,
  navbarTheme,
  navbarAvatar,
  navbarMenuPopOver,
} from "./dashboard-styles";
import { toggleDarkMode } from "src/store/reducers/theme/theme.slice";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  const [open, setOpen] = useState(null);
  const anchorRef = useRef(null);
  const { authInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();

  const MENU = MENU_OPTIONS(authInfo?.role);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <DashboardNavbarRoot sx={navBarRoot} {...other}>
        <Toolbar disableGutters sx={navbarToolbar}>
          <IconButton onClick={onSidebarOpen} sx={navbarMenu}>
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={navbarTheme}>
            Tema {theme.palette.isDarkTheme ? "Claro" : "Oscuro"}
            <IconButton sx={{ ml: 1 }} onClick={() => dispatch(toggleDarkMode())} color="inherit">
              {theme.palette.isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <IconButton ref={anchorRef} onClick={handleOpen} sx={navbarAvatar(open)}>
            <Avatar src="/static/images/avatars/account.png" alt="image-user" />
          </IconButton>

          <MenuPopover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            sx={navbarMenuPopOver}
          >
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                Usuario
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
                {authInfo?.username}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Stack sx={{ p: 1 }}>
              {MENU.map((option) => (
                <NextLink key={option.title} href={option.href} passHref>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText>{option.title}</ListItemText>
                  </MenuItem>
                </NextLink>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: "dashed" }} />

            <NextLink href={"/login"} passHref>
              <MenuItem onClick={() => dispatch(logout())} sx={{ m: 1 }}>
                Cerrar sesión
              </MenuItem>
            </NextLink>
          </MenuPopover>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
