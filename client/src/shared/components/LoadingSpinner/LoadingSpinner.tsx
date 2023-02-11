import { Backdrop, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: ({ zIndex: { drawer } }) => drawer + 1 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export { LoadingSpinner };
