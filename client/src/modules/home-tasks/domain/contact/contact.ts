export type Contact = {
  _id: string;
  name: string;
};

export type ContactRepository = {
  getAllContactsByUser: () => Promise<Contact[]>;
  deleteContact: (id: Contact['_id']) => Promise<void>;
  createContact: (data: { name: Contact['name'] }) => Promise<void>;
};
