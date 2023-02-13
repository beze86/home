import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import { Box, Divider, Drawer, IconButton, List, ListItemButton } from '@mui/material';

import { RouteType } from 'client/App';
import { useUserState } from 'client/shared/hooks/useUserState';
import { NavbarMobileRoute } from 'client/shared/layouts/Navbar/NavbarMobileRoute';

const LIST_MIN_WIDTH = '200px';

const NavbarMobile = ({ routes }: { routes: RouteType[] }) => {
  const {
    state: { isLogged },
    removeStatesOnLogout,
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
    removeStatesOnLogout();
  };

  const handleClickLogin = () => {
    handleCloseNavMenu();
    navigate('login');
  };

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none', ml: 'auto' },
      }}
    >
      <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOnClickOpenNavMenu} color="inherit">
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
          {isLogged && routes.map((route) => <NavbarMobileRoute key={route.mainPath} route={route} onClick={handleCloseNavMenu} />)}
          {isLogged ? <ListItemButton onClick={handleClickLogout}>Logout</ListItemButton> : <ListItemButton onClick={handleClickLogin}>Login</ListItemButton>}
          <Divider />
        </List>
      </Drawer>
    </Box>
  );
};

export { NavbarMobile };
