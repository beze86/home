import React, { useState, MouseEvent } from 'react';
import {
  BrowserRouter as Router,
  Link as RouterLink,
} from 'react-router-dom';

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Logo } from './Logo';

const pages = [
  ['Calendar', '/calendar'],
  ['Users', '/users'],
  ['Tasks', '/tasks'],
];
const settings = ['Profile', 'Logout'];

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] =
    useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] =
    useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (
    e: MouseEvent<HTMLElement>
  ) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (
    e: MouseEvent<HTMLElement>
  ) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Logo />
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Router>
                {pages.map(([page, link]) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Link
                      component={RouterLink}
                      to={link}
                      sx={{ textDecoration: 'none' }}
                    >
                      {page}
                    </Link>
                  </MenuItem>
                ))}
              </Router>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Logo />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Router>
              {pages.map(([page, link]) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                  }}
                >
                  <Link
                    component={RouterLink}
                    to={link}
                    sx={{
                      color: '#fff',
                      textDecoration: 'none',
                    }}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Router>
          </Box>

          <Box
            sx={{ flexGrow: 0, display: { xs: 'none' } }}
          >
            {/* TODO to be added once authentication is done */}
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
