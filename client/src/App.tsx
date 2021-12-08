import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { Container, ThemeProvider } from '@mui/material';
import { theme } from './theme';

import { Calendar } from './modules/main/ui/calendar/Calendar';
import { NavBar } from './shared/components/Navbar';
import { Home } from './modules/main/ui/home/Home';
import { Tasks } from './modules/main/ui/tasks/Tasks';
import { Users } from './modules/main/ui/users/Users';

const Routing = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="users" element={<Users />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Container>
          <Routing />
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
