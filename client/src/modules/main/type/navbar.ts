// this will be split in domain and application once i have a better understanding

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCalendarWeek, faCouch, faTasks, faUser } from '@fortawesome/pro-regular-svg-icons';

export type NavbarList = {
  title: string;
  url: string;
  icon?: IconDefinition;
  children?: NavbarList[];
};

export const navbarList: NavbarList[] = [
  { title: 'Calendar', url: '/calendar', icon: faCalendarWeek },
  { title: 'Users', url: '/users', icon: faCouch },
  { title: 'Areas', url: '/areas', icon: faTasks },
  { title: 'Tasks', url: '/tasks', icon: faUser },
];
