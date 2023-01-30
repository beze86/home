import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoadingSpinner } from 'client/shared/components/LoadingSpinner/LoadingSpinner';

const AreasList = lazy(() => import('client/modules/home-tasks/ui/area/AreasList'));

export const AreasRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AreasList />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
