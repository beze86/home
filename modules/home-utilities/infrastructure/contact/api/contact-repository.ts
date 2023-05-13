import { ObjectId } from 'mongodb';

import database from '../../../../../Database';
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
    return await this.collection.insertOne({ userId, name });
  }

  async deleteContact({ id }: DeleteContact) {
    await this.collection.deleteOne({ _id: id });
  }
}

export default MongoContactRepository;
