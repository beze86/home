import { SnackbarProvider } from 'notistack';
import { Provider as UserStateProvider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Stack, ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { store } from 'client/modules/app/store';
import { Login } from 'client/modules/auth/ui/auth/Login';
import { Register } from 'client/modules/auth/ui/auth/Register';
import { Home } from 'client/modules/home/ui/home/Home';
import { HomeTasksRoutes } from 'client/modules/home-utilities/ui';
import { ProtectedRoutes } from 'client/shared/components';
import { Navbar } from 'client/shared/layouts';
import { RouteType } from 'client/shared/layouts/Navbar/domain/navbar';
import { theme } from 'client/theme';

const protectedRoutesList: RouteType[] = [HomeTasksRoutes];

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <Stack sx={{ height: '100vh' }}>
              <Navbar routes={protectedRoutesList} />
              <Routing />
            </Stack>
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </UserStateProvider>
  );
};
