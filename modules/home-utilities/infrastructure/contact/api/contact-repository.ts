import { ObjectId } from 'mongodb';

import database from '../../../../../Database';
import User from '../../../../../models/User';
import { ContactRepository, ContactResult, CreateContact, DeleteContact, GetContacts } from '../../../domain/contact/contact';

class MongoContactRepository implements ContactRepository {
  private readonly collection;

  constructor() {
    this.collection = database.get().collection('contacts');
  }

  getContacts({ userId }: GetContacts) {
    return this.collection.find<ContactResult>({ userId: new ObjectId(userId) }).toArray();
  }

  async createContact({ userId, name }: CreateContact) {
    const { insertedId } = await this.collection.insertOne({ userId, name });
    await new User().addContactToUser({ userId, contactId: insertedId });
  }

  async deleteContact({ userId, id }: DeleteContact) {
    await this.collection.deleteOne({ _id: id });
    await new User().removeContactFromUser({ userId, contactId: id });
  }
}

export default MongoContactRepository;
