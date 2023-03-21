import React from 'react';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';

type Props = Omit<FontAwesomeIconProps, 'size'> & {
  icon: IconDefinition;
  size?: number;
};

export const Icon = ({ icon, size = 20, ...rest }: Props) => {
  return (
    <Box sx={{ '& .svg-inline--fa': { width: '1em', verticalAlign: 'middle' } }}>
      <FontAwesomeIcon icon={icon} color="inherit" height={size} width={size} {...rest} />
    </Box>
  );
};
