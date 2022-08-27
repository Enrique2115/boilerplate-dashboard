import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { NavItem } from "./nav-item";
import NavGroup from "./nav-group";

import { sidebarRoot, sidebarHeader, sidebarDrawer } from "./dashboard-styles";

export const DashboardSidebar = (props) => {
  const { items, open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box sx={sidebarRoot}>
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/admin" passHref>
              <a>
                <img src="/static/logo.svg" alt="logo" />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box sx={sidebarHeader}>
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Admin APP
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Template de un Dashboard
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />

        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) =>
            item.type === "item" ? (
              <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
            ) : (
              <NavGroup key={item.title} item={item} />
            )
          )}
        </Box>

        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: sidebarDrawer,
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: sidebarDrawer,
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
