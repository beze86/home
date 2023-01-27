import { useSnackbar as useNotistackSackbar } from 'notistack';
import { forwardRef } from 'react';

import { Snackbar, AlertColor, AlertProps } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert ref={ref} {...props} />;
});

const useSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useNotistackSackbar();

  const snackbar = (title: string, severity: AlertColor) =>
    enqueueSnackbar(title, {
      content: (key) => {
        return (
          <Snackbar open={true} onClose={() => closeSnackbar(key)}>
            <Alert onClose={() => closeSnackbar(key)} severity={severity}>
              {title}
            </Alert>
          </Snackbar>
        );
      },
    });

  return { snackbar };
};

export { useSnackbar };
