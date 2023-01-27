import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

const AreasList = lazy(() => import('client/modules/home-tasks/ui/area/AreasList'));

export const AreasRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<CircularProgress />}>
              <AreasList />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
