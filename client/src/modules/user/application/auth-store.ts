import decode from 'jwt-decode';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'client/modules/app/store';
import { AuthenticationToken } from 'client/modules/authentication-token/domain/authentication-token';
import { PROFILE_STORAGE_KEY, User, UserState } from 'client/modules/user/domain/user';

const profileLocalStorage = localStorage.getItem(PROFILE_STORAGE_KEY);

const isAuthenticated = (profileLocalStorage: string | null) => {
  if (!profileLocalStorage) return false;

  const token = JSON.parse(profileLocalStorage).token;

  if (!token) return false;

  const decodedToken = decode<AuthenticationToken>(token);

  return decodedToken.exp * 1000 >= new Date().getTime();
};

const initialState: UserState = {
  user: JSON.parse(profileLocalStorage!),
  isLogged: isAuthenticated(profileLocalStorage),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ ...action.payload }));
      state.isLogged = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      state.user = null;
      state.isLogged = false;
    },
    setUserState: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setUserState } = userSlice.actions;

export const userStateSelector = (state: RootState) => state.userState;

export default userSlice.reducer;
export { isAuthenticated };
