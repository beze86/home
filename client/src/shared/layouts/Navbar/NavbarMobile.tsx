import React, { MouseEvent } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Divider, Drawer, IconButton, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { RoutesList } from 'client/App';
import { Icon } from 'client/shared/components/Icon';
import { useUserState } from 'client/shared/hooks/useUserState';

type Props = {
  pages: RoutesList[];
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (e: MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
};

export const NavbarMobile = ({ pages, anchorElNav, handleOpenNavMenu, handleCloseNavMenu }: Props) => {
  const {
    state: { isLogged },
    removeStatesOnLogout,
  } = useUserState();

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none', ml: 'auto' },
      }}
    >
      <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            py: 0,
            px: 1,
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
          })}
        />
        <List sx={{ minWidth: '200px' }}>
          {isLogged &&
            pages.map(({ title, url, icon }) => (
              <React.Fragment key={title}>
                <Link
                  component={RouterLink}
                  to={url}
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    '&.active > li': {
                      backgroundColor: 'grey.100',
                    },
                  }}
                >
                  <ListItem sx={{ py: 4 }} onClick={handleCloseNavMenu}>
                    {icon && (
                      <ListItemIcon sx={{ minWidth: '32px' }}>
                        <Icon icon={icon} />
                      </ListItemIcon>
                    )}
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
                <Divider />
              </React.Fragment>
            ))}
          {isLogged ? (
            <Button
              onClick={removeStatesOnLogout}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
              }}
            >
              Logout
            </Button>
          ) : (
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                textDecoration: 'none',
                '&.active > button ': {
                  backgroundColor: 'primary.light',
                },
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
                Login
              </Button>
            </Link>
          )}
        </List>
      </Drawer>
    </Box>
  );
};
