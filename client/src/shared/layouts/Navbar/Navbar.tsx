import { AppBar, Container, Toolbar } from '@mui/material';

import { RoutesList } from 'client/App';
import { Logo } from 'client/shared/components/Logo';
import { NavbarDesktop } from 'client/shared/layouts/Navbar/NavbarDesktop';
import { NavbarMobile } from 'client/shared/layouts/Navbar/NavbarMobile';

export const NavBar = ({ routes }: { routes: RoutesList[] }) => {
  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Logo />
          <NavbarDesktop pages={routes} />
          <NavbarMobile pages={routes} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
