import axios from 'axios';

import { AreaRepository } from 'client/modules/areas/type/area';
import { profileStorageKey } from 'client/modules/auth/type/auth';

const PATH = '/api/v1/areas';

const API = axios.create({ baseURL: PATH });

API.interceptors.request.use((req) => {
  const storedItem = localStorage.getItem(profileStorageKey);
  if (storedItem) {
    if (req.headers) {
      req.headers.authorization = `Bearer ${JSON.parse(storedItem).token}`;
    }
  }
  return req;
});

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
