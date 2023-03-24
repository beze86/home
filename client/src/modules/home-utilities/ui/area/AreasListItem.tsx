import { Delete } from '@mui/icons-material';
import { IconButton, ListItem, Typography } from '@mui/material';

import { AreaCreation } from 'client/modules/home-utilities/domain/area/area';

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
          <Delete color="error" />
        </IconButton>
      }
    >
      <Typography variant="subtitle1" component="p" sx={{ textTransform: 'capitalize' }}>
        {area}
      </Typography>
    </ListItem>
  );
};
