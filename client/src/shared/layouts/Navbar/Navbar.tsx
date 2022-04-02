import React, { MouseEvent, useState } from 'react';

import { AppBar, Container, Toolbar } from '@mui/material';

import { Logo } from 'client/shared/components/Logo';
import { NavbarDesktop } from 'client/shared/layouts/Navbar/NavbarDesktop';
import { NavbarMobile } from 'client/shared/layouts/Navbar/NavbarMobile';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCalendarWeek, faCouch, faTasks, faUser } from '@fortawesome/pro-regular-svg-icons';

export type NavbarList = {
  title: string;
  url: string;
  icon?: IconDefinition;
  children?: NavbarList[];
  isPrivate: boolean;
};

export const navbarList: NavbarList[] = [
  { title: 'Calendar', url: '/calendar', icon: faCalendarWeek, isPrivate: false },
  { title: 'Contacts', url: '/contacts', icon: faCouch, isPrivate: true },
  { title: 'Areas', url: '/areas', icon: faTasks, isPrivate: true },
  { title: 'Tasks', url: '/tasks', icon: faUser, isPrivate: false },
];

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
