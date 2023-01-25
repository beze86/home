import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Area } from 'client/modules/home-tasks/ui/area/Area';
import { AreasList } from 'client/modules/home-tasks/ui/area/AreasList';

export const AreasRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<AreasList />} />
        <Route path=":id" element={<Area />} />
      </Routes>
    </>
  );
};
