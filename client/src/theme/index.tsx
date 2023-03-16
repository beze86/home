import { createTheme } from '@mui/material/styles';

const Color = {
  primary: {
    light: '#4dabf5',
    main: '#2196f3',
    dark: '#1769aa',
    contrastText: '#fff',
  },
  secondary: {
    light: '#f0f0f0',
    main: '#dedede',
    dark: '#979797',
    contrastText: '#fff',
  },
  error: {
    light: '#ff1744',
    main: '#d32f2f',
    dark: '#b2102f',
    contrastText: '#fff',
  },
  warning: {
    light: '#ff9800',
    main: '#ed6c02',
    dark: '#e65100',
    contrastText: '#fff',
  },
  info: {
    light: '#dd33fa',
    main: '#d500f9',
    dark: '#9500ae',
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
    secondary: Color.secondary,
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
        container: ({ theme: { breakpoints } }) => ({
          alignItems: 'flex-end',
          [breakpoints.up('sm')]: {
            alignItems: 'center',
          },
        }),
        paper: ({ theme: { breakpoints, spacing } }) => ({
          width: '100%',
          margin: spacing(0),
          [breakpoints.up('sm')]: {
            margin: spacing(6),
          },
        }),
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
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme: { palette } }) => ({
          backgroundColor: palette.grey['100'],
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-root:before, &.MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error):before, &.MuiInputBase-root:after':
            {
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
