import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Contact } from 'client/modules/home-tasks/ui/contact/Contact';
import { ContactsList } from 'client/modules/home-tasks/ui/contact/ContactsList';

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
