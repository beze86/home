import React from 'react';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  icon: IconDefinition;
};

export const Icon = ({ icon, ...rest }: Props) => {
  return <FontAwesomeIcon {...rest} icon={icon} />;
};
