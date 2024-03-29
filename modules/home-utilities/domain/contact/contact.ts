import { InsertOneResult, ObjectId } from 'mongodb';

import { UserId } from '../../../users/domain/user';

type ContactId = ObjectId;

type GetContacts = {
  userId: UserId;
};

type DeleteContact = {
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
  getContacts: (data: GetContacts) => Promise<ContactResult[]>;
  deleteContact: (data: DeleteContact) => Promise<void>;
  createContact: (data: CreateContact) => Promise<InsertOneResult>;
}

export type { ContactId, GetContacts, DeleteContact, CreateContact, ContactResult, ContactRepository };
