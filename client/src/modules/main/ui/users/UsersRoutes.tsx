import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { User } from 'client/modules/main/ui/users/User';
import { UsersList } from 'client/modules/main/ui/users/UsersList';

export const UsersRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<UsersList />} />
        <Route path=":id" element={<User />} />
      </Routes>
      <Outlet />
    </>
  );
};
