import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { NavBar } from './shared/Navbar';
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
    <>
      <NavBar />
      <Routing />
    </>
  );
};

export default App;
