import React, { MouseEvent, useState } from 'react';

import { AppBar, Container, Toolbar } from '@mui/material';

import { Logo } from 'client/shared/components/Logo';
import { navbarList } from 'client/modules/main/type/navbar';
import { NavbarDesktop } from 'client/shared/layouts/Navbar/NavbarDesktop';
import { NavbarMobile } from 'client/shared/layouts/Navbar/NavbarMobile';

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container sx={{ pl: 5 }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Logo />
          <NavbarDesktop pages={navbarList} handleCloseNavMenu={handleCloseNavMenu} />
          <NavbarMobile
            pages={navbarList}
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
