import React from 'react';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider as UserStateProvider } from 'react-redux';

import { Box, Container, ThemeProvider } from '@mui/material';
import { theme } from 'client/theme';

import { store } from 'client/modules/app/store';
import { AreasRoutes } from 'client/modules/areas/ui/areas/AreasRoutes';
import { Login } from 'client/modules/auth/ui/auth/Login';
import { Register } from 'client/modules/auth/ui/auth/Register';
import { Calendar } from 'client/modules/calendar/ui/calendar/Calendar';
import { ContactsRoutes } from 'client/modules/contacts/ui/contacts/ContactsRoutes';
import { Home } from 'client/modules/home/ui/home/Home';
import { TasksRoutes } from 'client/modules/tasks/ui/tasks/TasksRoutes';
import { faCalendarWeek, faCouch, faTasks, faUser } from '@fortawesome/pro-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

import { ProtectedRoute } from 'client/shared/components/ProtectedRoute/ProtectedRoute';
import { NavBar } from 'client/shared/layouts/Navbar/Navbar';

export type RoutesList = {
  title: string;
  url: string;
  icon?: IconDefinition;
  element: JSX.Element;
};

const routesList = (): RoutesList[] => {
  return [
    {
      title: 'Calendar',
      url: '/calendar',
      icon: faCalendarWeek,
      element: <Calendar />,
    },
    {
      title: 'Contacts',
      url: '/contacts',
      icon: faCouch,
      element: <ContactsRoutes />,
    },
    { title: 'Areas', url: '/areas', icon: faTasks, element: <AreasRoutes /> },
    { title: 'Tasks', url: '/tasks', icon: faUser, element: <TasksRoutes /> },
  ];
};

const Routing = () => {
  const routesComponent = () => {
    return routesList().map(({ url, element }) => (
      <Route key={url} path={`${url}/*`} element={<ProtectedRoute>{element}</ProtectedRoute>} />
    ));
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {routesComponent()}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <UserStateProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'grey.200' }}>
            <NavBar routes={routesList} />
            <Container disableGutters sx={{ padding: 5 }}>
              <Routing />
              <Outlet />
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </UserStateProvider>
  );
};
