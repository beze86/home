import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';
import { AreaRepository } from 'client/modules/home-tasks/domain/area/area';

const PATH = '/api/v1/areas';

const API = authenticationToken(PATH);

export function areasApi(): AreaRepository {
  return {
    getAllAreasByUser() {
      return API.get('/');
    },
    deleteArea(id) {
      return API.delete(`/${id}`);
    },
    createArea(areaName) {
      return API.post('/', { areaName });
    },
  };
}
