import { AxiosPromise } from 'axios';

export type User = {
  _id: string;
  user: string;
};

export type UserRepository = {
  getAllUsers: () => AxiosPromise<User[]>;
  deleteUser: (id: User['_id']) => AxiosPromise<void>;
  createUser: (userName: string) => AxiosPromise<{ insertedId: string }>;
};
