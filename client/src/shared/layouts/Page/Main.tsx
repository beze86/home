import { FC, PropsWithChildren } from 'react';

import { Box, styled } from '@mui/material';

const MainContainer = styled(Box)(() => ({
  width: '100%',
}));

const Main: FC<PropsWithChildren<unknown>> = ({ children }) => <MainContainer>{children}</MainContainer>;

export { Main };
