import { NavLink as RouterLink } from 'react-router-dom';

import { Box, Link } from '@mui/material';

import { RoutesList } from 'client/App';
import { useUserState } from 'client/shared/hooks/useUserState';
import { Button } from 'client/shared/layouts/Navbar/Button';

export const NavbarDesktop = ({ pages }: { pages: RoutesList[] }) => {
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
        display: { xs: 'none', md: 'flex' },
        flex: 'auto',
      }}
    >
      {isLogged &&
        pages.map(({ title, url }) => (
          <Link
            key={title}
            component={RouterLink}
            to={url}
            sx={{
              '&.active > button ': {
                backgroundColor: 'primary.light',
              },
            }}
          >
            <Button>{title}</Button>
          </Link>
        ))}
      {isLogged ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Link component={RouterLink} to="/login">
          <Button>Login</Button>
        </Link>
      )}
    </Box>
  );
};
