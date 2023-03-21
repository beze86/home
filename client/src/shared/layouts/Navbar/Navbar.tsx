import { AppBar, Container, Toolbar } from '@mui/material';

import { RouteType } from 'client/App';
import { Logo } from 'client/shared/components/Logo';
import { NavbarDesktop } from 'client/shared/layouts/Navbar/NavbarDesktop';
import { NavbarMobile } from 'client/shared/layouts/Navbar/NavbarMobile';

const Navbar = ({ routes }: { routes: RouteType[] }) => {
  return (
    <AppBar elevation={1}>
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

export { Navbar };
