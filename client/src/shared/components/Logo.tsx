import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Link } from '@mui/material';

import logo from 'client/shared/assets/logo.jpg';

export const Logo = () => {
  return (
    <Link component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        component="img"
        src={logo}
        alt="logo"
        sx={{
          maxWidth: '40px',
          width: '100%',
          height: 'auto',
          borderRadius: '50%',
          mr: 4,
        }}
      />
    </Link>
  );
};
