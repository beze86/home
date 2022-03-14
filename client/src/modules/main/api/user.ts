import axios from 'axios';

import { UserRepository } from 'client/modules/main/type/user';

const PATH = '/api/v1/users';

export function usersApi(): UserRepository {
  return {
    getAllUsers() {
      return axios.get(PATH);
    },
    deleteUser(id) {
      return axios.delete(`${PATH}/${id}`);
    },
    createUser(userData) {
      return axios.post(PATH, userData);
    },
  };
}
