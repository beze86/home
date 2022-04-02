import axios from 'axios';

import { AreaRepository } from 'client/modules/areas/type/area';

const PATH = '/api/v1/areas';

export function areasApi(): AreaRepository {
  return {
    getAllAreas() {
      return axios.get(PATH);
    },
    deleteArea(id) {
      return axios.delete(`${PATH}/${id}`);
    },
    createArea(areaName) {
      return axios.post(PATH, { areaName });
    },
  };
}
