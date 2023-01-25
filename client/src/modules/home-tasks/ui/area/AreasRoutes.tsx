import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { Area } from 'client/modules/home-tasks/ui/area/Area';
import AreasList from 'client/modules/home-tasks/ui/area/AreasList';

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
        <Route path=":id" element={<Area />} />
      </Routes>
    </>
  );
};
