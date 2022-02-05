import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Area } from 'client/modules/main/ui/areas/Area';
import { Areas } from 'client/modules/main/ui/areas/Areas';

export const AreasRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Areas />} />
        <Route path=":id" element={<Area />} />
      </Routes>
      <Outlet />
    </>
  );
};
