import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

const ContactsList = lazy(() => import('client/modules/home-tasks/ui/contact/ContactsList'));

export const ContactsRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<CircularProgress />}>
              <ContactsList />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
