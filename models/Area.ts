import { Collection, ObjectId } from 'mongodb';

import User, { UserId } from './User';
import database from '../Database';

type AreaId = ObjectId;

type GetAllAreasByUser = {
  userId: UserId;
};

type DeleteArea = {
  userId: UserId;
  id: AreaId;
};

type CreateArea = {
  userId: UserId;
  area: string;
};

type AreaResult = {
  _id: AreaId;
  userId: UserId;
  area: string;
};

interface AreaInterface {
  collection: Collection;
  getAllAreasByUser: (data: GetAllAreasByUser) => Promise<AreaResult[]>;
  deleteArea: (data: DeleteArea) => Promise<void>;
  createArea: (data: CreateArea) => Promise<void>;
}

class Area implements AreaInterface {
  collection;

  constructor() {
    this.collection = database.get().collection('areas');
  }

  getAllAreasByUser({ userId }: GetAllAreasByUser) {
    return this.collection.find<AreaResult>({ userId: new ObjectId(userId) }).toArray();
  }

  async deleteArea({ userId, id }: DeleteArea) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    await new User().removeAreaFromUser({ userId, areaId: new ObjectId(id) });
  }

  async createArea({ userId, area }: CreateArea) {
    const { insertedId } = await this.collection.insertOne({ userId: new ObjectId(userId), area });
    await new User().addAreaToUser({ userId, areaId: insertedId });
  }
}

export default Area;
export type { AreaId, CreateArea };
