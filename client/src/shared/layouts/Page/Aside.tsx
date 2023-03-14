import { FC, PropsWithChildren } from 'react';

import { Stack, styled } from '@mui/material';

const ASIDE_MAX_WIDTH = '300px';

const AsideContainer = styled(Stack)(({ theme: { breakpoints, spacing, palette } }) => ({
  flexDirection: 'row',
  gap: spacing(2),
  width: '100%',
  position: 'relative',
  [breakpoints.up('md')]: {
    maxWidth: ASIDE_MAX_WIDTH,
    '&:after': {
      position: 'absolute',
      content: '""',
      width: '1px',
      top: 0,
      left: `calc(${ASIDE_MAX_WIDTH} + ${spacing(2)})`,
      bottom: 0,
      backgroundColor: palette.grey['200'],
    },
  },
}));

const Aside: FC<PropsWithChildren> = ({ children }) => <AsideContainer>{children}</AsideContainer>;

export { Aside };
