import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Contact } from 'client/modules/main/ui/contacts/Contact';
import { ContactsList } from 'client/modules/main/ui/contacts/ContactsList';

export const ContactsRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<ContactsList />} />
        <Route path=":id" element={<Contact />} />
      </Routes>
      <Outlet />
    </>
  );
};
