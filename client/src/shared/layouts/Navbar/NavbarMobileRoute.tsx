import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { Box, Collapse, Divider, Link, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { RouteType } from 'client/App';
import { Icon } from 'client/shared/components/Icon';

const NavbarMobileRoute = ({ route: { title, path: mainPath, children }, onClick }: { route: RouteType; onClick: () => void }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = children ? children.some((child) => `/${mainPath}/${child.path}` === pathname) : `/${mainPath}` === pathname;

  const [isCollapseVisible, setIsCollapseVisible] = useState(isActive);

  const handleClickMainRoute = (path: string) => {
    if (!!children) return setIsCollapseVisible((prev) => !prev);
    onClick();
    navigate(path);
  };

  const handleClickChildRoute = (path: string) => {
    onClick();
    navigate(path);
  };

  return (
    <>
      <ListItemButton selected={isActive} onClick={() => handleClickMainRoute(mainPath)}>
        <ListItemText primary={title} />
        {!!children && <Box component="span">{isCollapseVisible ? <Icon icon={faChevronUp} /> : <Icon icon={faChevronDown} />}</Box>}
      </ListItemButton>
      <Collapse in={isCollapseVisible} timeout="auto" unmountOnExit>
        <List disablePadding>
          {children?.map(({ title, icon, path }) => {
            const childPath = `${mainPath}/${path}`;
            return (
              <Link key={path} onClick={() => handleClickChildRoute(childPath)}>
                <ListItemButton selected={pathname === childPath} sx={{ paddingY: 2, paddingLeft: 8 }}>
                  {icon && (
                    <ListItemIcon sx={{ minWidth: '32px' }}>
                      <Icon icon={icon} />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={title} />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </>
  );
};

export { NavbarMobileRoute };
