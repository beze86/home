import { Collection, ObjectId, UpdateResult, WithId } from 'mongodb';

import User from './User';
import database from '../Database';

type UserId = ObjectId;

type GetAllContactsByUserType = {
  userId: UserId;
};

type DeleteContactType = {
  userId: UserId;
  id: ObjectId;
};

type CreateContactType = {
  userId: UserId;
  name: string;
};

interface ContactInterface {
  collection: Collection;
  getAllContactsByUser: (data: GetAllContactsByUserType) => Promise<WithId<Document>[]>;
  deleteContact: (data: DeleteContactType) => Promise<void>;
  createContact: (data: CreateContactType) => Promise<void>;
}

class Contact implements ContactInterface {
  collection;

  constructor() {
    this.collection = database.getDb().collection('contacts');
  }

  getAllContactsByUser({ userId }: GetAllContactsByUserType) {
    return this.collection.find({ userId: new ObjectId(userId) }).toArray();
  }

  async deleteContact({ userId, id }: DeleteContactType) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    await new User().removeContactFromUser({ userId, contactId: id });
  }

  async createContact({ userId, name }: CreateContactType) {
    const { insertedId } = await this.collection.insertOne({ userId: new ObjectId(userId), name });
    await new User().addContactToUser({ userId, contactId: insertedId });
  }
}

export default Contact;
