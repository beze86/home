import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { Box, Button, Link } from '@mui/material';

import { RoutesList } from 'client/App';
import { useUserState } from 'client/shared/hooks/useUserState';

type Props = {
  pages: RoutesList[];
  handleCloseNavMenu: () => void;
};

export const NavbarDesktop = ({ pages, handleCloseNavMenu }: Props) => {
  const {
    state: { isLogged },
    removeStatesOnLogout,
  } = useUserState();

  const handleLogout = () => {
    removeStatesOnLogout();
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
      }}
    >
      {isLogged &&
        pages.map(({ title, url }) => (
          <Link
            key={title}
            component={RouterLink}
            to={url}
            sx={{
              textDecoration: 'none',
              '&.active > button ': {
                backgroundColor: 'primary.light',
              },
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
              }}
            >
              {title}
            </Button>
          </Link>
        ))}
      {isLogged ? (
        <Button
          variant="outlined"
          onClick={handleLogout}
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
            my: 2,
            color: 'white',
            display: 'block',
          }}
        >
          <Button
            variant="outlined"
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
    </Box>
  );
};
