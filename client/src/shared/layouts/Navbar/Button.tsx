import { FC, PropsWithChildren } from 'react';

import { Button as MuiButton } from '@mui/material';

const Button: FC<PropsWithChildren<{ onClick?: () => void }>> = ({ children, ...props }) => (
  <MuiButton
    sx={(theme) => ({
      marginBlock: 2,
      color: 'white',
      '&.MuiButton-active': {
        backgroundColor: theme.palette.primary.light,
      },
    })}
    variant="outlined"
    {...props}
  >
    {children}
  </MuiButton>
);

export { Button };
