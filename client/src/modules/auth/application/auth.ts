import decode from 'jwt-decode';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'client/modules/app/store';
import { User, UserState } from 'client/modules/auth/domain/auth';
import { AuthenticationToken } from 'client/modules/authentication-token/domain/authentication-token';

export const profileStorageKey = 'userProfile';

const profileLocalStorage = localStorage.getItem(profileStorageKey);

const isUserLoggedIn = () => {
  if (!profileLocalStorage) return false;

  const token = JSON.parse(profileLocalStorage).token;

  if (!token) return false;

  const decodedToken = decode<AuthenticationToken>(token);

  return decodedToken.exp * 1000 >= new Date().getTime();
};

const initialState: UserState = {
  user: JSON.parse(profileLocalStorage!),
  isLogged: isUserLoggedIn(),
};

const userSlice = createSlice({
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
