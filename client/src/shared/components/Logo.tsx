import React from 'react';
import {
  BrowserRouter as Router,
  Link as RouterLink,
} from 'react-router-dom';

import { Link } from '@mui/material';

import logo from '../assets/logo.jpg';

import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Router>
      <Link component={RouterLink} to="/">
        <img
          className={styles['test']}
          src={logo}
          alt="logo"
        />
      </Link>
    </Router>
  );
};
