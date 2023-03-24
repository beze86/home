import { RouteChildType } from 'client/shared/layouts/Navbar/domain/navbar';

const getUrlFromMainPath = (mainPath: string) => (mainPath.trim().length > 0 ? `/${mainPath}` : mainPath);

const isTabActive = (children: RouteChildType[] | undefined, initialPath: string, mainPath: string, routePathname: string) =>
  children ? children.some((child) => `${initialPath}/${child.path}` === routePathname) : `/${mainPath}` === routePathname;

export { getUrlFromMainPath, isTabActive };
