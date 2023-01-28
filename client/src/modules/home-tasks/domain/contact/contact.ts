type ContactId = string;

type Contact = ContactCreation & {
  _id: ContactId;
};

type ContactCreation = {
  name: string;
};

type ContactRepository = {
  getAllContactsByUser: () => Promise<Contact[]>;
  deleteContact: (id: ContactId) => Promise<void>;
  createContact: (data: ContactCreation) => Promise<void>;
};

export type { ContactId, Contact, ContactCreation, ContactRepository };
