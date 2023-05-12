import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import { Box, Divider, Drawer, IconButton, List, ListItemButton, Stack } from '@mui/material';

import { useUserState } from 'client/shared/hooks/useUserState';
import { RouteType } from 'client/shared/layouts/Navbar/domain/navbar';
import { NavbarMobileRoute } from 'client/shared/layouts/Navbar/NavbarMobileRoute';

const LIST_MIN_WIDTH = '200px';

const NavbarMobile = ({ routes }: { routes: RouteType[] }) => {
  const {
    state: { isLogged },
    logoutUser,
  } = useUserState();

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [iconButtonActive, setIconButtonActive] = useState(false);

  const handleOnClickOpenNavMenu = (evt: MouseEvent<HTMLElement>) => {
    !iconButtonActive ? setAnchorElNav(evt.currentTarget) : setAnchorElNav(null);
    setIconButtonActive((prev) => !prev);
  };

  const handleCloseNavMenu = () => {
    setIconButtonActive(false);
    setAnchorElNav(null);
  };

  const handleClickLogout = () => {
    handleCloseNavMenu();
    logoutUser();
  };

  const handleClickLogin = () => {
    handleCloseNavMenu();
    navigate('login');
  };

  const handleClickRegister = () => {
    handleCloseNavMenu();
    navigate('login');
  };

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none', ml: 'auto' },
      }}
    >
      <IconButton
        size="large"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOnClickOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={!!anchorElNav} onClose={handleCloseNavMenu}>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            py: 0,
            px: 1,
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
          })}
        />
        <List sx={{ minWidth: LIST_MIN_WIDTH }}>
          {isLogged && (
            <>
              {routes.map((route) => (
                <NavbarMobileRoute key={route.path} route={route} onClick={handleCloseNavMenu} />
              ))}
              <ListItemButton
                onClick={handleClickLogout}
                sx={(theme) => ({ color: theme.palette.error.light, fontWeight: '400' })}
              >
                Logout
              </ListItemButton>
            </>
          )}
          {!isLogged && (
            <>
              <ListItemButton onClick={handleClickLogin}>Login</ListItemButton>
              <Divider />
              <ListItemButton onClick={handleClickRegister}>Register</ListItemButton>
            </>
          )}
          <Divider />
        </List>
      </Drawer>
    </Box>
  );
};

export { NavbarMobile };
