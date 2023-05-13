import { ObjectId } from 'mongodb';

import database from '../../../../../Database';
import { CreateArea } from '../../../../../models/Area';
import User from '../../../../../models/User';
import { AreaRepository, AreaResult, DeleteArea, GetAreas } from '../../../domain/area/area';

class MongoAreaRepository implements AreaRepository {
  private readonly collection;

  constructor() {
    this.collection = database.get().collection('areas');
  }

  getAreas({ userId }: GetAreas) {
    return this.collection.find<AreaResult>({ userId }).toArray();
  }

  async createArea({ userId, area }: CreateArea) {
    const { insertedId } = await this.collection.insertOne({ userId, area });
    await new User().addAreaToUser({ userId, areaId: insertedId });
  }

  async deleteArea({ userId, id }: DeleteArea) {
    await this.collection.deleteOne({ _id: id });
    await new User().removeAreaFromUser({ userId, areaId: id });
  }
}

export default MongoAreaRepository;
