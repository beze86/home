import { Navigate, Route, Routes } from 'react-router-dom';

import { RoutesList } from 'client/App';
import { Home } from 'client/modules/home/ui/home/Home';
import { useUserState } from 'client/shared/hooks/useUserState';

const ProtectedNavigation = ({ children }: { children: JSX.Element }) => {
  const {
    state: { isLogged },
  } = useUserState();

  if (!isLogged) return <Navigate to="/login" />;

  return children;
};

const ProtectedRoutes = ({ list }: { list: RoutesList[] }) => {
  return (
    <Routes>
      {list.map(({ url, element }) => (
        <Route key={url} path={`${url}/*`} element={<ProtectedNavigation>{element}</ProtectedNavigation>} />
      ))}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export { ProtectedRoutes };
