type UserId = string;

type UserLogin = {
  email: string;
  password: string;
};

type UserRegister = {
  fullName: string;
  email: string;
  password: string;
};

type User = {
  id: UserId;
  email: string;
  fullName: string;
  password: string;
  contacts: string[];
  areas: string[];
  tasks: string[];
  events: string[];
};

type UserState = {
  user: User | null;
  isLogged: boolean;
};

type UserRepository = {
  register: (data: UserRegister) => Promise<User>;
  login: (data: UserLogin) => Promise<User>;
  delete: (id: UserId) => Promise<void>;
};

const PROFILE_STORAGE_KEY = 'userProfile';

export type { UserId, UserLogin, UserRegister, User, UserState, UserRepository };

export { PROFILE_STORAGE_KEY };
