import { AreaRepository, CreateArea, DeleteArea, GetAreas } from '../../domain/area/area';

class AreaApplication implements AreaRepository {
  private readonly repository: AreaRepository;

  constructor(repository: AreaRepository) {
    this.repository = repository;
  }

  getAreas({ userId }: GetAreas) {
    return this.repository.getAreas({ userId });
  }

  createArea({ userId, area }: CreateArea) {
    return this.repository.createArea({ userId, area });
  }

  deleteArea({ userId, id }: DeleteArea) {
    return this.repository.deleteArea({ userId, id });
  }
}

export default AreaApplication;
