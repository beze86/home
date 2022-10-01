import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { User, removeStatesOnLogout, setStatesOnLogin, setUserState, userStateSelector } from 'client/modules/auth/type/auth';
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
