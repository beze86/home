import { UserRepository, User } from 'client/modules/auth/domain/auth';
import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';

const PATH = '/api/v1/users';

const API = authenticationToken(PATH);

export function usersApi(): UserRepository {
  return {
    register(userData) {
      return API.post('/', userData);
    },
    async login(userData) {
      try {
        const { data } = await API.post<User>('/login', userData);
        return data;
      } catch (err) {
        throw new Error('Error requesting to login');
      }
    },
    delete(id) {
      return API.post(`/${id}`);
    },
  };
}
