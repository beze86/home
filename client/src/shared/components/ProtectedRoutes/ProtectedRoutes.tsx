import { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from 'client/modules/home/ui/home/Home';
import { isAuthenticated } from 'client/modules/user/application/auth-store';
import { PROFILE_STORAGE_KEY } from 'client/modules/user/domain/user';
import { useUserState } from 'client/shared/hooks/useUserState';
import { RouteChildType, RouteType } from 'client/shared/layouts/Navbar/domain/navbar';

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
  const { logoutUser } = useUserState();

  const profileLocalStorage = localStorage.getItem(PROFILE_STORAGE_KEY);

  const isUserAuthenticated = isAuthenticated(profileLocalStorage);

  if (!isUserAuthenticated) {
    logoutUser();
  }

  if (!isUserAuthenticated) {
    return <Navigate to="/login" />;
  }

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
