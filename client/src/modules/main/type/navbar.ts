// this will be split in domain and application once i have a better understanding

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCalendarWeek, faCouch, faTasks, faUser } from '@fortawesome/pro-regular-svg-icons';

export type NavbarList = {
  title: string;
  url: string;
  icon?: IconDefinition;
  children?: NavbarList[];
  isPrivate: boolean;
};

export const navbarList: NavbarList[] = [
  { title: 'Calendar', url: '/calendar', icon: faCalendarWeek, isPrivate: false },
  { title: 'Contacts', url: '/contacts', icon: faCouch, isPrivate: true },
  { title: 'Areas', url: '/areas', icon: faTasks, isPrivate: true },
  { title: 'Tasks', url: '/tasks', icon: faUser, isPrivate: false },
];
