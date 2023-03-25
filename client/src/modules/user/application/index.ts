import { UserService } from 'client/modules/user/application/user';
import { UserRepository } from 'client/modules/user/domain/user';

type ApplicationRepositories = {
  user: UserRepository;
};

type Application = {
  repositories: ApplicationRepositories;
};

const application = ({ repositories: { user } }: Application) => {
  return {
    register: UserService(user).register,
    login: UserService(user).login,
    delete: UserService(user).delete,
  };
};

export { application };
