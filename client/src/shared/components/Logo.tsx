import React from 'react';

import logo from '../assets/logo.jpg';

import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <img className={styles['test']} src={logo} alt="logo" />
  );
};
