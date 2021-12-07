import React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { NavBar } from './shared/components/Navbar';
import { Home } from './modules/main/ui/home/Home';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Routing />
    </ThemeProvider>
  );
};

export default App;
