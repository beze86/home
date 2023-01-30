import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoadingSpinner } from 'client/shared/components/LoadingSpinner/LoadingSpinner';

const TasksList = lazy(() => import('client/modules/home-tasks/ui/task/TasksList'));

export const TasksRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <TasksList />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
