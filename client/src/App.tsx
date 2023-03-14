import { SnackbarProvider } from 'notistack';
import { Provider as UserStateProvider } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCalendarWeek, faCouch, faTasks, faUser } from '@fortawesome/pro-regular-svg-icons';
import { Stack, ThemeProvider, CssBaseline } from '@mui/material';

import { store } from 'client/modules/app/store';
import { Login } from 'client/modules/auth/ui/auth/Login';
import { Register } from 'client/modules/auth/ui/auth/Register';
import { Home } from 'client/modules/home/ui/home/Home';
import { AreasRoutes } from 'client/modules/home-tasks/ui/area/AreasRoutes';
import { Calendar } from 'client/modules/home-tasks/ui/calendar/Calendar';
import { ContactsRoutes } from 'client/modules/home-tasks/ui/contact/ContactsRoutes';
import { TasksRoutes } from 'client/modules/home-tasks/ui/task/TasksRoutes';
import { ProtectedRoutes } from 'client/shared/components/ProtectedRoute/ProtectedRoute';
import { NavBar } from 'client/shared/layouts/Navbar/Navbar';
import { theme } from 'client/theme';

export type RouteChildType = {
  title: string;
  path: string;
  icon?: IconDefinition;
  element: JSX.Element;
};

export type RouteType = {
  title: string;
  path: string;
  element?: JSX.Element;
  children?: RouteChildType[];
};

const protectedRoutesList: RouteType[] = [
  {
    title: 'House-tasks',
    path: 'house',
    children: [
      {
        title: 'Calendar',
        path: 'calendar',
        icon: faCalendarWeek,
        element: <Calendar />,
      },
      {
        title: 'Contacts',
        path: 'contacts',
        icon: faCouch,
        element: <ContactsRoutes />,
      },
      { title: 'Areas', path: 'areas', icon: faTasks, element: <AreasRoutes /> },
      { title: 'Tasks', path: 'tasks', icon: faUser, element: <TasksRoutes /> },
    ],
  },
];

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<ProtectedRoutes routes={protectedRoutesList} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <UserStateProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <Stack sx={{ height: '100vh' }}>
            <NavBar routes={protectedRoutesList} />
            <Routing />
            <Outlet />
          </Stack>
        </SnackbarProvider>
      </ThemeProvider>
    </UserStateProvider>
  );
};
