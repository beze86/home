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

import { ProtectedRoute } from 'client/shared/components/ProtectedRoute/ProtectedRoute';
import { NavBar } from 'client/shared/layouts/Navbar/Navbar';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="calendar" element={<Calendar />} />
      <Route
        path="contacts/*"
        element={
          <ProtectedRoute>
            <ContactsRoutes />
          </ProtectedRoute>
        }
      />
      <Route
        path="areas/*"
        element={
          <ProtectedRoute>
            <AreasRoutes />
          </ProtectedRoute>
        }
      />
      <Route path="tasks/*" element={<TasksRoutes />} />
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
            <NavBar />
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
