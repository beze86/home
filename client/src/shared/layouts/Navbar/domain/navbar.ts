import { ReactNode } from 'react';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';

type RouteChildType = {
  title: string;
  path: string;
  icon?: IconDefinition;
  element: ReactNode;
};

type RouteType = {
  title: string;
  path: string;
  element?: ReactNode;
  children?: RouteChildType[];
};

export type { RouteChildType, RouteType };
