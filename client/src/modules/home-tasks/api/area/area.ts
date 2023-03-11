import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';
import { AreaRepository } from 'client/modules/home-tasks/domain/area/area';

const PATH = '/api/v1/areas';

const API = authenticationToken(PATH);

export function areasApi(): AreaRepository {
  return {
    async getAllAreasByUser() {
      try {
        const { data } = await API.get('/');
        return data;
      } catch {
        throw new Error('Failed to fetch area list');
      }
    },
    async deleteArea(id) {
      try {
        await API.delete(`/${id}`);
      } catch {
        throw new Error('Failed to delete area');
      }
    },
    async createArea(data) {
      try {
        await API.post('/', data);
      } catch {
        throw new Error('Failed to create area');
      }
    },
  };
}
