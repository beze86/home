import axios, { AxiosInstance } from 'axios';

import { PROFILE_STORAGE_KEY } from 'client/modules/user/domain/user';

const authenticationToken = (path: string): AxiosInstance => {
  const API = axios.create({ baseURL: path });

  API.interceptors.request.use(
    (req) => {
      const storedItem = localStorage.getItem(PROFILE_STORAGE_KEY);
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
