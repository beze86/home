import { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteChildType, RouteType } from 'client/App';
import { Home } from 'client/modules/home/ui/home/Home';
import { useUserState } from 'client/shared/hooks/useUserState';

const routesWithChildren = (children: RouteChildType[], mainPath: string, title: string) => {
  return (
    <Route path={mainPath} key={title}>
      {children.map(({ path, element }) => {
        return <Route key={path} path={`${path}/*`} element={<ProtectedNavigation>{element}</ProtectedNavigation>} />;
      })}
    </Route>
  );
};

const routesWithoutChildren = (element: ReactNode, mainPath: string, title: string): ReactNode => {
  return <Route key={title} path={mainPath} element={<ProtectedNavigation>{element}</ProtectedNavigation>} />;
};

const ProtectedNavigation = ({ children }: { children: ReactNode }): JSX.Element => {
  const {
    state: { isLogged },
  } = useUserState();

  if (!isLogged) return <Navigate to="/login" />;

  return <>{children}</>;
};

const ProtectedRoutes = ({ routes }: { routes: RouteType[] }) => {
  return (
    <Routes>
      {routes.map(({ children, path: mainPath, element, title }) => {
        if (children) return routesWithChildren(children, mainPath, title);
        if (!children && element) return routesWithoutChildren(element, mainPath, title);
      })}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export { ProtectedRoutes };
