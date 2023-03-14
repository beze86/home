import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteType } from 'client/App';
import { Home } from 'client/modules/home/ui/home/Home';
import { useUserState } from 'client/shared/hooks/useUserState';

const ProtectedNavigation = ({ children }: { children: JSX.Element }) => {
  const {
    state: { isLogged },
  } = useUserState();

  if (!isLogged) return <Navigate to="/login" />;

  return children;
};

const ProtectedRoutes = ({ routes }: { routes: RouteType[] }) => {
  return (
    <Routes>
      {routes.map(({ children, path: mainPath, element }) => {
        if (children) return children.map(({ path, element }) => <Route key={path} path={`${mainPath}/${path}/*`} element={<ProtectedNavigation>{element}</ProtectedNavigation>} />);
        if (!children && element) return <Route key={mainPath} path={mainPath} element={<ProtectedNavigation>{element}</ProtectedNavigation>} />;
      })}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export { ProtectedRoutes };
