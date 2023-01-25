import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { Contact } from 'client/modules/home-tasks/ui/contact/Contact';
import { ContactsList } from 'client/modules/home-tasks/ui/contact/ContactsList';

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
        <Route path=":id" element={<Contact />} />
      </Routes>
    </>
  );
};
