import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link } from '@mui/material';

import logo from 'client/shared/assets/logo.jpg';

import styles from 'client/shared/components/Logo.module.scss';

export const Logo = () => {
  return (
    <Link component={RouterLink} to="/">
      <img
        className={styles['test']}
        src={logo}
        alt="logo"
      />
    </Link>
  );
};
