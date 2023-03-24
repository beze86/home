import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

import { useUserState } from 'client/shared/hooks/useUserState';
import { Button } from 'client/shared/layouts/Navbar/Button';
import { RouteType } from 'client/shared/layouts/Navbar/domain/navbar';
import { NavbarDesktopRoute } from 'client/shared/layouts/Navbar/NavbarDesktopRoute';

const NavbarDesktop = ({ routes }: { routes: RouteType[] }) => {
  const navigate = useNavigate();

  const {
    state: { isLogged },
    removeStatesOnLogout,
  } = useUserState();

  const handleClickLogout = () => removeStatesOnLogout();

  const handleClickLogin = () => navigate('login');

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        gap: 2,
        flex: 'auto',
      }}
    >
      {isLogged &&
        routes.map((route) => {
          return <NavbarDesktopRoute key={route.path} route={route} />;
        })}
      {isLogged ? <Button onClick={handleClickLogout}>Logout</Button> : <Button onClick={handleClickLogin}>Login</Button>}
    </Box>
  );
};

export { NavbarDesktop };
