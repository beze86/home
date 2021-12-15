import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#42a5f5',
      main: '#1976d2',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    error: {
      light: '#ef5350',
      main: '#d32f2f',
      dark: '#c62828',
      contrastText: '#fff',
    },
    warning: {
      light: '#ff9800',
      main: '#ed6c02',
      dark: '#e65100',
      contrastText: '#fff',
    },
    info: {
      light: '#03a9f4',
      main: '#0288d1',
      dark: '#01579b',
      contrastText: '#fff',
    },
    success: {
      light: '#4caf50',
      main: '#2e7d32',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  spacing: ['0', '4px', '8px', '12px', '16px', '24px', '32px', '40px', '48px'],
});
