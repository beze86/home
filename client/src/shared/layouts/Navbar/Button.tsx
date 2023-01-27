import { FC, PropsWithChildren } from 'react';

import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(MuiButton)(({ theme: { spacing } }) => ({
  marginBlock: spacing(2),
  color: 'white',
}));

const Button: FC<PropsWithChildren<{ onClick?: () => void }>> = ({ children, ...props }) => (
  <StyledButton variant="outlined" {...props}>
    {children}
  </StyledButton>
);

export { Button };
