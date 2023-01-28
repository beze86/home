import { FC, PropsWithChildren } from 'react';

import { Stack } from '@mui/material';

const WIDTH_600 = '600px';

type CenteredStackType = {
  maxWidth?: string;
};

const CenteredStack: FC<PropsWithChildren<CenteredStackType>> = ({ maxWidth = WIDTH_600, children }) => {
  return (
    <Stack width="100%" maxWidth={maxWidth} alignItems="center" justifyContent="center" margin="auto" gap={2}>
      {children}
    </Stack>
  );
};

export { CenteredStack };
