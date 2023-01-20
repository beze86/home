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
  fullName: string;
};

interface ContactInterface {
  collection: Collection;
  getAllContactsByUser: (data: GetAllContactsByUserType) => Promise<WithId<Document>[]>;
  deleteContact: (data: DeleteContactType) => Promise<UpdateResult>;
  createContact: (data: CreateContactType) => Promise<ObjectId>;
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
    return new User().removeContactFromUser({ userId, contactId: id });
  }

  async createContact({ userId, fullName }: CreateContactType) {
    const { insertedId } = await this.collection.insertOne({ userId: new ObjectId(userId), fullName });
    await new User().addContactToUser({ userId, contactId: insertedId });
    return insertedId;
  }
}

export default Contact;
