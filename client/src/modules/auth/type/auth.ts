import { AxiosPromise } from 'axios';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export type User = {
  _id: string;
  fullName: string;
  email: string;
  accounts: string[];
};

type UserState = {
  user: User | null;
  isLogged: boolean;
};

const initialState: UserState = {
  user: null,
  isLogged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
    },
    setUserState: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUserState } = userSlice.actions;

export const userStateSelector = (state: RootState) => state.userState;

export default userSlice.reducer;

export type UserRepository = {
  getAllUsers: () => AxiosPromise<User[]>;
  deleteUser: (id: User['_id']) => AxiosPromise<void>;
  createUser: (userData: User) => AxiosPromise<{ insertedId: string }>;
};
