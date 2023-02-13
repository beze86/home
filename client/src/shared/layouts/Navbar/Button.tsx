import { FC, PropsWithChildren } from 'react';

import { Button as MuiButton } from '@mui/material';

const Button: FC<PropsWithChildren<{ onClick?: () => void }>> = ({ children, ...props }) => (
  <MuiButton sx={{ marginBlock: 2, color: 'white' }} variant="outlined" {...props}>
    {children}
  </MuiButton>
);

export { Button };
