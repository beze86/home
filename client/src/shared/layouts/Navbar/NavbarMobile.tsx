import { Fragment, MouseEvent, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Divider, Drawer, IconButton, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { RoutesList } from 'client/App';
import { Icon } from 'client/shared/components/Icon';
import { useUserState } from 'client/shared/hooks/useUserState';

export const NavbarMobile = ({ pages }: { pages: RoutesList[] }) => {
  const {
    state: { isLogged },
    removeStatesOnLogout,
  } = useUserState();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [iconButtonActive, setIconButtonActive] = useState(false);

  const handleOnClickOpenNavMenu = (evt: MouseEvent<HTMLElement>) => {
    !iconButtonActive ? setAnchorElNav(evt.currentTarget) : setAnchorElNav(null);
    setIconButtonActive((prev) => !prev);
  };

  const handleOnCloseNavMenu = () => {
    setIconButtonActive(false);
    setAnchorElNav(null);
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
      <Drawer anchor="right" open={!!anchorElNav} onClose={handleOnCloseNavMenu}>
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
        <List sx={{ minWidth: '200px' }}>
          {isLogged &&
            pages.map(({ title, url, icon }) => (
              <Fragment key={title}>
                <Link
                  component={RouterLink}
                  to={url}
                  sx={{
                    display: 'block',
                    '&.active > li': {
                      backgroundColor: 'grey.100',
                    },
                  }}
                >
                  <ListItem sx={{ py: 4 }} onClick={handleOnCloseNavMenu}>
                    {icon && (
                      <ListItemIcon sx={{ minWidth: '32px' }}>
                        <Icon icon={icon} />
                      </ListItemIcon>
                    )}
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
                <Divider />
              </Fragment>
            ))}
          {isLogged ? (
            <ListItem>
              <Button onClick={removeStatesOnLogout}>Logout</Button>
            </ListItem>
          ) : (
            <Link component={RouterLink} to="/login">
              <ListItem>
                <Button onClick={handleOnCloseNavMenu}>Login</Button>
              </ListItem>
            </Link>
          )}
        </List>
      </Drawer>
    </Box>
  );
};
