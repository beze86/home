type UserId = string;

type UserLogin = {
  email: string;
  password: string;
};

type UserRegister = UserLogin & {
  fullName: string;
};

type User = UserRegister & {
  id: string;
  fullName: string;
  accounts: string[];
};

type UserState = {
  user: User | null;
  isLogged: boolean;
};

type UserRepository = {
  register: (data: UserRegister) => Promise<void>;
  login: (data: UserLogin) => Promise<User>;
  delete: (id: UserId) => Promise<void>;
};

const PROFILE_STORAGE_KEY = 'userProfile';

export type { UserId, UserLogin, UserRegister, User, UserState, UserRepository };

export { PROFILE_STORAGE_KEY };
