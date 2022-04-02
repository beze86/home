import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { Box, Button, Link } from '@mui/material';

import { useUserState } from 'client/shared/hooks/useUserState';
import { NavbarList } from 'client/shared/layouts/Navbar/Navbar';

type Props = {
  pages: NavbarList[];
  handleCloseNavMenu: () => void;
};

export const NavbarDesktop = ({ pages, handleCloseNavMenu }: Props) => {
  const { state } = useUserState();
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
      }}
    >
      {pages
        .filter(({ isPrivate }) => !isPrivate || (isPrivate && state.isLogged))
        .map(({ title, url }) => (
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
    </Box>
  );
};
