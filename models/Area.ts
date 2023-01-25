import { Collection, ObjectId, WithId, Document, UpdateResult } from 'mongodb';

import User from './User';
import database from '../Database';

type UserId = ObjectId;

type GetAllAreasByUserType = {
  userId: UserId;
};

type DeleteAreaType = {
  userId: UserId;
  id: ObjectId;
};

type CreateAreaType = {
  userId: UserId;
  area: string;
};

interface AreaInterface {
  collection: Collection;
  getAllAreasByUser: (data: GetAllAreasByUserType) => Promise<WithId<Document>[]>;
  deleteArea: (data: DeleteAreaType) => Promise<UpdateResult>;
  createArea: (data: CreateAreaType) => Promise<void>;
}

class Area implements AreaInterface {
  collection;

  constructor() {
    this.collection = database.getDb().collection('areas');
  }

  getAllAreasByUser({ userId }: GetAllAreasByUserType) {
    return this.collection.find({ userId: new ObjectId(userId) }).toArray();
  }

  async deleteArea({ userId, id }: DeleteAreaType) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    return new User().removeAreaFromUser({ userId, areaId: id });
  }

  async createArea({ userId, area }: CreateAreaType) {
    const { insertedId } = await this.collection.insertOne({ userId: new ObjectId(userId), area });
    await new User().addAreaToUser({ userId, areaId: insertedId });
  }
}

export default Area;
