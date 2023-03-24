import { AreaRepository } from 'client/modules/home-utilities/domain/area/area';

const AreaService = (repository: AreaRepository): AreaRepository => {
  return {
    getAreas: () => repository.getAreas(),
    createArea: (area) => repository.createArea(area),
    deleteArea: (id) => repository.deleteArea(id),
  };
};

export { AreaService };
