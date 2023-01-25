import { SnackbarProvider } from 'notistack';
import { Provider as UserStateProvider } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCalendarWeek, faCouch, faTasks, faUser } from '@fortawesome/pro-regular-svg-icons';
import { Box, Container, ThemeProvider } from '@mui/material';

import { store } from 'client/modules/app/store';
import { Login } from 'client/modules/auth/ui/auth/Login';
import { Register } from 'client/modules/auth/ui/auth/Register';
import { Calendar } from 'client/modules/calendar/ui/calendar/Calendar';
import { Home } from 'client/modules/home/ui/home/Home';
import { AreasRoutes } from 'client/modules/home-tasks/ui/area/AreasRoutes';
import { ContactsRoutes } from 'client/modules/home-tasks/ui/contact/ContactsRoutes';
import { TasksRoutes } from 'client/modules/home-tasks/ui/task/TasksRoutes';
import { ProtectedRoutes } from 'client/shared/components/ProtectedRoute/ProtectedRoute';
import { NavBar } from 'client/shared/layouts/Navbar/Navbar';
import { theme } from 'client/theme';

export type RoutesList = {
  title: string;
  url: string;
  icon?: IconDefinition;
  element: JSX.Element;
};

const protectedRoutesList: RoutesList[] = [
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

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<ProtectedRoutes list={protectedRoutesList} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <UserStateProvider store={store}>
      <ThemeProvider theme={theme}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*// @ts-ignore*/}
        <SnackbarProvider>
          <Box
            sx={{
              width: '100%',
              minHeight: '100vh',
              backgroundColor: 'grey.200',
            }}
          >
            <NavBar routes={protectedRoutesList} />
            <Container disableGutters sx={{ padding: 5 }}>
              <Routing />
              <Outlet />
            </Container>
          </Box>
        </SnackbarProvider>
      </ThemeProvider>
    </UserStateProvider>
  );
};
