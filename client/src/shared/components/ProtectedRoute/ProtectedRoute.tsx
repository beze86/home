import React from 'react';
import { Navigate } from 'react-router-dom';

import { useUserState } from 'client/shared/hooks/useUserState';

type Props = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: Props) => {
  const {
    state: { isLogged },
  } = useUserState();

  if (!isLogged) return <Navigate to="/login" />;

  return children;
};
