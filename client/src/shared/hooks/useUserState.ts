import { useMemo } from 'react';
import {
  User,
  login,
  logout,
  setUserState,
  userStateSelector,
} from 'client/modules/main/type/user';
import { useDispatch, useSelector } from 'react-redux';
export const useUserState = () => {
  const dispatch = useDispatch();
  const state = useSelector(userStateSelector);

  return useMemo(() => {
    return {
      state,
      setUserState: (userData: User) => dispatch(setUserState(userData)),
      login: () => dispatch(login()),
      logout: () => dispatch(logout()),
    };
  }, []);
};
