import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

const TasksList = lazy(() => import('client/modules/home-tasks/ui/task/TasksList'));

export const TasksRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<CircularProgress />}>
              <TasksList />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
