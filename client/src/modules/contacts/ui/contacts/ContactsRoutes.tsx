import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Contact } from 'client/modules/contacts/ui/contacts/Contact';
import { ContactsList } from 'client/modules/contacts/ui/contacts/ContactsList';

export const ContactsRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<ContactsList />} />
        <Route path=":id" element={<Contact />} />
      </Routes>
    </>
  );
};
