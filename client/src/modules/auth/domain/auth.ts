import { AxiosPromise } from 'axios';

type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  accounts: string[];
};

type UserState = {
  user: User | null;
  isLogged: boolean;
};

type UserRepository = {
  register: (userData: Partial<User>) => AxiosPromise<{ insertedId: string }>;
  login: (userData: Partial<User>) => Promise<User>;
  delete: (id: User['id']) => AxiosPromise<void>;
};

export type { User, UserState, UserRepository };
