import React, { MouseEvent } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { NavbarList } from 'client/shared/layouts/Navbar/Navbar';
import { useUserState } from 'client/shared/hooks/useUserState';
import { Icon } from 'client/shared/components/Icon';

type Props = {
  pages: NavbarList[];
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (e: MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
};

export const NavbarMobile = ({
  pages,
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
}: Props) => {
  const { state } = useUserState();

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
        onClick={handleOpenNavMenu}
        color="inherit"
      >
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
          {pages
            .filter(({ isPrivate }) => !isPrivate || (isPrivate && state.isLogged))
            .map(({ title, url, icon }) => (
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
        </List>
      </Drawer>
    </Box>
  );
};
