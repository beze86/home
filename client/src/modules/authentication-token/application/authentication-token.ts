import axios, { AxiosInstance } from 'axios';

import { profileStorageKey } from 'client/modules/auth/application/auth';

const authenticationToken = (path: string): AxiosInstance => {
  const API = axios.create({ baseURL: path });

  API.interceptors.request.use(
    (req) => {
      const storedItem = localStorage.getItem(profileStorageKey);
      if (storedItem) {
        if (req.headers) {
          req.headers.authorization = `Bearer ${JSON.parse(storedItem).token}`;
        }
      }
      return req;
    },
    () => {
      throw new Error('Failed to authenticate');
    },
  );

  return API;
};

export { authenticationToken };
