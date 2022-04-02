import React from 'react';
import { Navigate } from 'react-router-dom';

import { useUserState } from 'client/shared/hooks/useUserState';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { state } = useUserState();

  if (!state.user) return <Navigate to="/login" />;

  return children;
};
