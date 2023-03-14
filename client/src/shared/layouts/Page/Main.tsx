import { FC, PropsWithChildren } from 'react';

import { Box, styled } from '@mui/material';

const MainContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
}));

const Main: FC<PropsWithChildren> = ({ children }) => <MainContainer>{children}</MainContainer>;

export { Main };
