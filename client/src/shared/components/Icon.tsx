import React from 'react';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Stack } from '@mui/material';

type Props = Omit<FontAwesomeIconProps, 'size'> & {
  icon: IconDefinition;
  size?: string;
  color?: string;
};

export const Icon = ({ icon, size = '18px', color, ...rest }: Props) => {
  return (
    <Stack
      sx={{
        width: size,
        height: size,
        color,
        '& .svg-inline--fa': { width: size, height: size, verticalAlign: 'middle' },
      }}
    >
      <FontAwesomeIcon icon={icon} color="inherit" height={size} width={size} {...rest} />
    </Stack>
  );
};
