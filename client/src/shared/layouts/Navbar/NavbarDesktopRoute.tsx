import { bindHover, bindMenu } from 'material-ui-popup-state';
import { PopupState as PopupStateType, usePopupState } from 'material-ui-popup-state/hooks';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import { createContext, useContext, useCallback, useMemo, FC, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MenuItem } from '@mui/material';

import { RouteChildType, RouteType } from 'client/App';
import { Button } from 'client/shared/layouts/Navbar/Button';

const MENU_ITEM_MIN_WIDTH = '160px';
const MENU_ACTIVE_CLASS = 'MuiButton-active';

type CascadingContextType = {
  rootPopupState: PopupStateType | null;
  parentPopupState: PopupStateType | null;
};

const CascadingContext = createContext<CascadingContextType>({
  parentPopupState: null,
  rootPopupState: null,
});

const CascadingMenuItem = ({ title, path, selected }: { title: RouteChildType['title']; path: RouteChildType['path']; selected: boolean }) => {
  const { rootPopupState } = useContext(CascadingContext);

  const navigate = useNavigate();

  if (!rootPopupState) throw new Error('must be used inside a CascadingMenu');

  const handleClickMenuItem = useCallback(() => {
    rootPopupState.close();
    rootPopupState.anchorEl?.classList.add(MENU_ACTIVE_CLASS);
    navigate(path);
  }, [rootPopupState, navigate, path]);

  return (
    <MenuItem
      key={path}
      selected={selected}
      onClick={handleClickMenuItem}
      sx={{
        minWidth: MENU_ITEM_MIN_WIDTH,
      }}
    >
      {title}
    </MenuItem>
  );
};

const CascadingMenu: FC<
  PropsWithChildren<{
    popupState: PopupStateType;
  }>
> = ({ popupState, children, ...props }) => {
  const { rootPopupState } = useContext(CascadingContext);

  const context = useMemo(
    () => ({
      rootPopupState: rootPopupState || popupState,
      parentPopupState: popupState,
    }),
    [rootPopupState, popupState],
  );
  return (
    <CascadingContext.Provider value={context}>
      <HoverMenu {...props} {...bindMenu(popupState)}>
        {children}
      </HoverMenu>
    </CascadingContext.Provider>
  );
};

const NavbarDesktopRoute = ({ route: { title, mainPath, children } }: { route: RouteType }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: `menu-${title}`,
  });

  const handleClickMainRoute = () => navigate(mainPath);

  const isActive = children?.some((child) => `/${mainPath}/${child.path}` === pathname);

  return (
    <>
      <Button
        {...(isActive && {
          className: MENU_ACTIVE_CLASS,
        })}
        {...(!!children
          ? {
              ...bindHover(popupState),
            }
          : {
              onClick: handleClickMainRoute,
            })}
      >
        {title}
      </Button>
      {children && (
        <CascadingMenu popupState={popupState}>
          {children.map(({ title, path }) => {
            const childPath = `/${mainPath}/${path}`;
            return <CascadingMenuItem key={path} title={title} path={childPath} selected={childPath === pathname} />;
          })}
        </CascadingMenu>
      )}
    </>
  );
};

export { NavbarDesktopRoute };
