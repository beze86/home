import { Collection, ObjectId, WithId } from 'mongodb';

import User, { UserId } from './User';
import database from '../Database';

type ContactId = ObjectId;

type GetAllContactsByUser = {
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

interface ContactInterface {
  collection: Collection;
  getAllContactsByUser: (data: GetAllContactsByUser) => Promise<WithId<ContactResult>[]>;
  deleteContact: (data: DeleteContact) => Promise<void>;
  createContact: (data: CreateContact) => Promise<void>;
}

class Contact implements ContactInterface {
  collection;

  constructor() {
    this.collection = database.get().collection('contacts');
  }

  getAllContactsByUser({ userId }: GetAllContactsByUser) {
    return this.collection.find<ContactResult>({ userId: new ObjectId(userId) }).toArray();
  }

  async deleteContact({ userId, id }: DeleteContact) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    await new User().removeContactFromUser({ userId, contactId: new ObjectId(id) });
  }

  async createContact({ userId, name }: CreateContact) {
    const { insertedId } = await this.collection.insertOne({ userId: new ObjectId(userId), name });
    await new User().addContactToUser({ userId, contactId: insertedId });
  }
}

export default Contact;
export type { ContactId };
