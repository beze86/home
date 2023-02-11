import { ReactNode } from 'react';

import { Box, styled } from '@mui/material';

import { Aside } from 'client/shared/layouts/Page/Aside';
import { Main } from 'client/shared/layouts/Page/Main';

type PageType = {
  size?: 'full-width' | 'normal-screen' | 'small-screen';
  children: ReactNode;
};

const NORMAL_SCREEN_SIZE = '1440px';
const SMALL_SCREEN_SIZE = '1200px';

const PageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'size',
})<PageType>(({ theme: { breakpoints, spacing }, size }) => ({
  display: 'flex',
  boxSizing: 'border-box',
  gap: spacing(4),
  flexDirection: 'column',
  padding: spacing(4, 2),
  margin: spacing(0, 'auto'),
  height: '100%',
  width: '100%',
  overflowY: 'auto',
  ...(size === 'normal-screen' && {
    maxWidth: NORMAL_SCREEN_SIZE,
  }),
  ...(size === 'small-screen' && {
    maxWidth: SMALL_SCREEN_SIZE,
  }),
  [breakpoints.up('md')]: {
    flexDirection: 'row',
    padding: spacing(6, 3),
  },
}));

const Page = ({ size = 'full-width', children }: PageType) => <PageContainer size={size}>{children}</PageContainer>;

Page.Aside = Aside;
Page.Main = Main;

export { Page };
