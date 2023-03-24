import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { faCalendarWeek, faCouch, faTasks, faUser } from '@fortawesome/pro-regular-svg-icons';

import { application } from 'client/modules/home-utilities/application';
import { areaApi } from 'client/modules/home-utilities/infrastructure/area/area';
import { calendarApi } from 'client/modules/home-utilities/infrastructure/calendar/calendar';
import { contactApi } from 'client/modules/home-utilities/infrastructure/contact/contact';
import { taskApi } from 'client/modules/home-utilities/infrastructure/task/task';
import { LoadingSpinner } from 'client/shared/components';

const AreasList = lazy(() => import('client/modules/home-utilities/ui/area/AreasList'));
const ContactsList = lazy(() => import('client/modules/home-utilities/ui/contact/ContactsList'));
const Calendar = lazy(() => import('client/modules/home-utilities/ui/calendar/Calendar'));
const TasksList = lazy(() => import('client/modules/home-utilities/ui/task/TasksList'));

const Api = application({
  repositories: { contact: contactApi(), area: areaApi(), calendar: calendarApi(), task: taskApi() },
});

const HomeTasksRoutes = {
  title: 'Home-utilities',
  path: 'home-tasks',
  element: <Outlet />,
  children: [
    {
      title: 'Calendar',
      path: 'calendar',
      icon: faCalendarWeek,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Calendar />
        </Suspense>
      ),
    },
    {
      title: 'Contacts',
      path: 'contacts',
      icon: faCouch,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ContactsList />
        </Suspense>
      ),
    },
    {
      title: 'Areas',
      path: 'areas',
      icon: faTasks,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AreasList />
        </Suspense>
      ),
    },
    {
      title: 'Tasks',
      path: 'tasks',
      icon: faUser,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <TasksList />
        </Suspense>
      ),
    },
  ],
};

export { HomeTasksRoutes, Api };
