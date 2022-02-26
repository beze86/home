import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Box, Container, ThemeProvider } from '@mui/material';
import { theme } from 'client/theme';

import { Calendar } from 'client/modules/main/ui/calendar/Calendar';
import { Home } from 'client/modules/main/ui/home/Home';
import { TasksRoutes } from 'client/modules/main/ui/tasks/TasksRoutes';
import { NavBar } from 'client/shared/layouts/Navbar/Navbar';
import { AreasRoutes } from './modules/main/ui/areas/AreasRoutes';
import { UsersRoutes } from 'client/modules/main/ui/users/UsersRoutes';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="users/*" element={<UsersRoutes />} />
      <Route path="areas/*" element={<AreasRoutes />} />
      <Route path="tasks" element={<TasksRoutes />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'grey.200' }}>
          <NavBar />
          <Container disableGutters sx={{ padding: 5 }}>
            <Routing />
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
};
