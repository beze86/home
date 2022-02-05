import axios from 'axios';

const PATH = '/api/v1/areas';

export const areasApi = () => {
  return {
    getAllAreas() {
      return axios.get(PATH);
    },
  };
};
