import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Area } from 'client/modules/areas/ui/areas/Area';
import { AreasList } from 'client/modules/areas/ui/areas/AreasList';

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
