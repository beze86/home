import axios from 'axios';

export const areasApi = () => {
  return {
    get getAllAreas() {
      return async () => {
        return await axios.get('/api/v1/areas');
      };
    },
  };
};
