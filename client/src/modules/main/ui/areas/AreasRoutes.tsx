import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Area } from 'client/modules/main/ui/areas/Area';
import { AreasList } from 'client/modules/main/ui/areas/AreasList';

export const AreasRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<AreasList />} />
        <Route path=":id" element={<Area />} />
      </Routes>
      <Outlet />
    </>
  );
};
