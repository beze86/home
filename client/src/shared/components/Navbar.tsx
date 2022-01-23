import React, { useState, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCalendarWeek, faCouch, faTasks, faUser } from '@fortawesome/pro-regular-svg-icons';

import { Icon } from 'client/shared/components/Icon';
import { Logo } from 'client/shared/components/Logo';

const pages: [string, string, IconDefinition][] = [
  ['Calendar', '/calendar', faCalendarWeek],
  ['Users', '/users', faUser],
  ['Areas', '/areas', faCouch],
  ['Tasks', '/tasks', faTasks],
];

const settings = ['Profile', 'Logout'];

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container sx={{ pl: 5 }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: 'flex',
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
            {pages.map(([page, link]) => (
              <Link
                key={page}
                component={RouterLink}
                to={link}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ display: 'flex', ml: 'auto' }}>
            <Box sx={{ flexGrow: 0, display: 'none' }}>
              {/* TODO to be added once authentication is done */}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
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
              <Drawer anchor="right" open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                <DrawerHeader />
                <List sx={{ minWidth: '200px' }}>
                  {pages.map(([page, link, icon], i) => (
                    <React.Fragment key={`${page}-${i}`}>
                      <Link
                        component={RouterLink}
                        to={link}
                        sx={{ display: 'block', textDecoration: 'none' }}
                      >
                        <ListItem sx={{ py: 4 }} onClick={handleCloseNavMenu}>
                          <ListItemIcon sx={{ minWidth: '32px' }}>
                            <Icon icon={icon} />
                          </ListItemIcon>
                          <ListItemText primary={page} />
                        </ListItem>
                      </Link>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Drawer>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
