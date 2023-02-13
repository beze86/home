import { bindHover, bindMenu } from 'material-ui-popup-state';
import { PopupState as PopupStateType, usePopupState } from 'material-ui-popup-state/hooks';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import { createContext, useContext, useCallback, useMemo, FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { MenuItem } from '@mui/material';

import { RouteChildType, RouteType } from 'client/App';
import { Button } from 'client/shared/layouts/Navbar/Button';

const MENU_ITEM_MIN_WIDTH = '160px';

type CascadingContextType = {
  rootPopupState: PopupStateType | null;
  parentPopupState: PopupStateType | null;
};

const CascadingContext = createContext<CascadingContextType>({
  parentPopupState: null,
  rootPopupState: null,
});

const CascadingMenuItem = ({ title, path }: Pick<RouteChildType, 'title' | 'path'>) => {
  const navigate = useNavigate();
  const { rootPopupState } = useContext(CascadingContext);
  if (!rootPopupState) throw new Error('must be used inside a CascadingMenu');

  const handleClickMenuItem = useCallback(() => {
    rootPopupState.close();
    navigate(path);
  }, [rootPopupState, navigate, path]);

  return (
    <MenuItem key={title} onClick={handleClickMenuItem} sx={{ minWidth: MENU_ITEM_MIN_WIDTH }}>
      {title}
    </MenuItem>
  );
};

const CascadingMenu: FC<PropsWithChildren<{ popupState: PopupStateType }>> = ({ popupState, children, ...props }) => {
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
  const popupState = usePopupState({ variant: 'popover', popupId: `menu-${title}` });

  const handleClickMainRoute = () => navigate(mainPath);

  return (
    <>
      <Button {...(!!children ? { ...bindHover(popupState) } : { onClick: handleClickMainRoute })}>{title}</Button>
      {children && (
        <CascadingMenu popupState={popupState}>
          {children.map(({ title, path }) => {
            return <CascadingMenuItem key={path} title={title} path={`${mainPath}/${path}`} />;
          })}
        </CascadingMenu>
      )}
    </>
  );
};

export { NavbarDesktopRoute };
