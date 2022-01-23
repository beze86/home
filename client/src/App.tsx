import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Box, Container, ThemeProvider } from '@mui/material';
import { theme } from 'client/theme';

import { Areas } from 'client/modules/main/ui/areas/Areas';
import { Calendar } from 'client/modules/main/ui/calendar/Calendar';
import { Home } from 'client/modules/main/ui/home/Home';
import { Tasks } from 'client/modules/main/ui/tasks/Tasks';
import { Users } from 'client/modules/main/ui/users/Users';
import { NavBar } from 'client/shared/layouts/Navbar/Navbar';

const Routing = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="users" element={<Users />} />
      <Route path="areas" element={<Areas />} />
      <Route path="tasks" element={<Tasks />} />
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
