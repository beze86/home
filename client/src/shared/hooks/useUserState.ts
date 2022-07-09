import { useMemo } from 'react';
import {
  User,
  removeStatesOnLogout,
  setStatesOnLogin,
  setUserState,
  userStateSelector,
} from 'client/modules/auth/type/auth';
import { useDispatch, useSelector } from 'react-redux';
export const useUserState = () => {
  const dispatch = useDispatch();
  const state = useSelector(userStateSelector);

  return useMemo(() => {
    return {
      state,
      setUserState: (userData: User) => dispatch(setUserState(userData)),
      setStatesOnLogin: (userData: User) => dispatch(setStatesOnLogin(userData)),
      removeStatesOnLogout: () => dispatch(removeStatesOnLogout()),
    };
  }, [state, dispatch]);
};
