import { ObjectId, WithId } from 'mongodb';

import { UserId } from '../../../../models/User';

type ContactId = ObjectId;

type GetContacts = {
  userId: UserId;
};

type DeleteContact = {
  userId: UserId;
  id: ContactId;
};

type CreateContact = {
  userId: UserId;
  name: string;
};

type ContactResult = {
  _id: ContactId;
  userId: UserId;
  name: string;
};

interface ContactRepository {
  getContacts: (data: GetContacts) => Promise<WithId<ContactResult>[]>;
  deleteContact: (data: DeleteContact) => Promise<void>;
  createContact: (data: CreateContact) => Promise<void>;
}

export type { ContactId, GetContacts, DeleteContact, CreateContact, ContactResult, ContactRepository };
