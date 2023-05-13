import database from '../../../../../Database';
import { CreateArea } from '../../../../../models/Area';
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
    return await this.collection.insertOne({ userId, area });
  }

  async deleteArea({ id }: DeleteArea) {
    await this.collection.deleteOne({ _id: id });
  }
}

export default MongoAreaRepository;
