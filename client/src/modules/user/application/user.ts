import { UserRepository } from 'client/modules/user/domain/user';

const UserService = (repository: UserRepository): UserRepository => {
  return {
    register: (data) => repository.register(data),
    login: (data) => repository.login(data),
    delete: (id) => repository.delete(id),
  };
};

export { UserService };
