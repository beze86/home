import { AxiosPromise } from 'axios';

export type Contact = {
  _id: string;
  fullName: string;
};

export type ContactRepository = {
  getAllContacts: () => AxiosPromise<Contact[]>;
  deleteContact: (id: Contact['_id']) => AxiosPromise<void>;
  createContact: (contactName: Contact['fullName']) => AxiosPromise<{ insertedId: string }>;
};
