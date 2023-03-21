import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoadingSpinner } from 'client/shared/components/LoadingSpinner/LoadingSpinner';

const ContactsList = lazy(() => import('client/modules/home-tasks/ui/contact/ContactsList'));

export const ContactsRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <ContactsList />
          </Suspense>
        }
      />
    </Routes>
  );
};
