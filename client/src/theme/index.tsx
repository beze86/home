import { createTheme } from '@mui/material/styles';

const Color = {
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
  grey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

const Text = {
  primary: Color.grey[800],
  secondary: Color.grey[500],
};

export const theme = createTheme({
  palette: {
    text: Text,
    primary: Color.primary,
    error: Color.error,
    warning: Color.warning,
    info: Color.info,
    success: Color.success,
    grey: Color.grey,
  },
  typography: {
    allVariants: {
      color: Text.primary,
    },
  },
  spacing: ['0', '4px', '8px', '12px', '16px', '24px', '32px', '40px', '48px'],
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          boxSizing: 'border-box',
          fontFamily: 'Roboto, sans-serif',
          backgroundColor: theme.palette.grey['100'],
          margin: '0',
        },
      }),
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      },
      styleOverrides: {
        root: {
          width: '300px',
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        elevation: 4,
      },
    },
    MuiAppBar: {
      defaultProps: {
        position: 'sticky',
      },
      styleOverrides: {
        root: ({
          theme: {
            zIndex: { drawer },
          },
        }) => ({
          zIndex: drawer + 1,
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme: { spacing } }) => ({
          paddingBlock: spacing(4),
          paddingInline: spacing(5),
          '&:last-child': {
            paddingBottom: spacing(4),
          },
        }),
      },
    },
    MuiDialog: {
      defaultProps: {
        maxWidth: 'sm',
      },
      styleOverrides: {
        paper: {
          width: '100%',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme: { spacing } }) => ({
          padding: spacing(4, 5),
        }),
      },
    },
    MuiDialogContent: {
      defaultProps: {
        dividers: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-root:before, &.MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error):before, &.MuiInputBase-root:after': {
            borderBottomWidth: '1px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme: { palette } }) => ({
          color: palette.grey['400'],
          fontWeight: 300,
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme: { palette } }) => ({
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.grey['400'],
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          flex: 'auto',
        },
      },
    },
    MuiToolbar: {
      defaultProps: {
        disableGutters: true,
      },
      styleOverrides: {
        root: {
          justifyContent: 'space-between',
        },
      },
    },
  },
});
