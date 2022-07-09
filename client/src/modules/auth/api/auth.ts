import axios from 'axios';

import { UserRepository, profileStorageKey } from 'client/modules/auth/type/auth';

const PATH = '/api/v1/users';

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

export function usersApi(): UserRepository {
  return {
    register(userData) {
      return API.post('/', userData);
    },
    login(userData) {
      return API.post('/login', userData);
    },
    delete(id) {
      return API.post(`/${id}`);
    },
  };
}
