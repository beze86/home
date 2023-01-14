import { AxiosPromise } from 'axios';
import decode from 'jwt-decode';

// TODO find issue related to eslint with redux
// eslint-disable-next-line import/named
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'client/modules/app/store';

export type User = {
  data: {
    id: string;
    fullName: string;
    email: string;
    password: string;
    accounts: string[];
  };
};

type UserState = {
  user: User | null;
  isLogged: boolean;
};

type Token = {
  id: string;
  exp: number;
  iat: number;
};

export const profileStorageKey = 'userProfile';

const profileLocalStorage = localStorage.getItem(profileStorageKey);

const isUserLoggedIn = () => {
  if (!profileLocalStorage) return false;

  const token = JSON.parse(profileLocalStorage).token;

  if (!token) return false;

  const decodedToken = decode<Token>(token);

  return decodedToken.exp * 1000 >= new Date().getTime();
};

const initialState: UserState = {
  user: JSON.parse(profileLocalStorage!),
  isLogged: isUserLoggedIn(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatesOnLogin: (state, action) => {
      localStorage.setItem(profileStorageKey, JSON.stringify({ ...action.payload }));
      state.isLogged = true;
      state.user = action.payload;
    },
    removeStatesOnLogout: (state) => {
      localStorage.removeItem(profileStorageKey);
      state.user = null;
      state.isLogged = false;
    },
    setUserState: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setStatesOnLogin, removeStatesOnLogout, setUserState } = userSlice.actions;

export const userStateSelector = (state: RootState) => state.userState;

export default userSlice.reducer;

export type UserRepository = {
  register: (userData: Partial<User['data']>) => AxiosPromise<{ insertedId: string }>;
  login: (userData: Partial<User['data']>) => AxiosPromise<User>;
  delete: (id: User['data']['id']) => AxiosPromise<void>;
};
