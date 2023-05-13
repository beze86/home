import { AreaRepository, CreateArea, DeleteArea, GetAreas } from '../../domain/area/area';

class AreaApplication {
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

  deleteArea({ id }: DeleteArea) {
    return this.repository.deleteArea({ id });
  }
}

export default AreaApplication;
