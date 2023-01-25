import { AxiosPromise } from 'axios';

export type Contact = {
  _id: string;
  fullName: string;
};

export type ContactRepository = {
  getAllContactsByUser: () => AxiosPromise<Contact[]>;
  deleteContact: (id: Contact['_id']) => AxiosPromise<void>;
  createContact: (data: Contact['fullName']) => AxiosPromise<{ insertedId: string }>;
};
