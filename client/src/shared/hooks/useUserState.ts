import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser, logoutUser, setUserState, userStateSelector } from 'client/modules/user/application/auth-store';
import { User } from 'client/modules/user/domain/user';

const useUserState = () => {
  const dispatch = useDispatch();
  const state = useSelector(userStateSelector);

  return useMemo(() => {
    return {
      state,
      setUserState: (userData: User) => dispatch(setUserState(userData)),
      loginUser: (userData: User) => dispatch(loginUser(userData)),
      logoutUser: () => dispatch(logoutUser()),
    };
  }, [state, dispatch]);
};

export { useUserState };
