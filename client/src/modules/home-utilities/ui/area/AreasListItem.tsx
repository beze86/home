import { faTrash } from '@fortawesome/pro-solid-svg-icons';
import { IconButton, ListItem, Typography } from '@mui/material';

import { AreaCreation } from 'client/modules/home-utilities/domain/area/area';
import { Icon } from 'client/shared/components';

type AreaListItemType = {
  area: AreaCreation['area'];
  onClickDeleteArea: () => void;
};

export const AreasListItem = ({ area, onClickDeleteArea }: AreaListItemType) => {
  return (
    <ListItem
      disableGutters
      secondaryAction={
        <IconButton onClick={onClickDeleteArea} aria-label="delete">
          <Icon icon={faTrash} size="18px" color="error.main" />
        </IconButton>
      }
    >
      <Typography variant="subtitle1" component="p" sx={{ textTransform: 'capitalize' }}>
        {area}
      </Typography>
    </ListItem>
  );
};
