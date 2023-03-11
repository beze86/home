import { useTheme, useMediaQuery } from '@mui/material';

const useBreakpoint = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return { isMobile };
};

export { useBreakpoint };
