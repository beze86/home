import { AxiosError } from 'axios';

import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';
import { User, UserRepository } from 'client/modules/user/domain/user';

const PATH = '/api/v1/users';

const API = authenticationToken(PATH);

const userApi = (): UserRepository => {
  return {
    async register(userData) {
      try {
        const { data } = await API.post<User>('/register', userData);
        return data;
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        if (error instanceof AxiosError && error.response) {
          throw new Error(error.response.data.error);
        }
        throw new Error('Error requesting to register');
      }
    },

    async login(userData) {
      try {
        const { data } = await API.post<User>('/login', userData);
        return data;
      } catch {
        throw new Error('Error requesting to login');
      }
    },

    delete(id) {
      return API.post(`/${id}`);
    },
  };
};

export { userApi };
