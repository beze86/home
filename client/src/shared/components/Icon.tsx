import React from 'react';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

type Props = FontAwesomeIconProps & {
  icon: IconDefinition;
};

export const Icon = ({ icon, ...rest }: Props) => {
  return <FontAwesomeIcon {...rest} icon={icon} color="inherit" />;
};
