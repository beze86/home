import { AppBar, Container, Toolbar } from '@mui/material';

import { RouteType } from 'client/App';
import { Logo } from 'client/shared/components/Logo';
import { NavbarDesktop } from 'client/shared/layouts/Navbar/NavbarDesktop';
import { NavbarMobile } from 'client/shared/layouts/Navbar/NavbarMobile';

export const NavBar = ({ routes }: { routes: RouteType[] }) => {
  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Logo />
          <NavbarDesktop routes={routes} />
          <NavbarMobile routes={routes} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
