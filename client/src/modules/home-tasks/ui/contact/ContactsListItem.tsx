import { Delete } from '@mui/icons-material';
import { IconButton, ListItem, Typography } from '@mui/material';

import { ContactCreation } from 'client/modules/home-tasks/domain/contact/contact';

type ContactsListItemType = {
  name: ContactCreation['name'];
  onClickDeleteContact: () => void;
};

export const ContactsListItem = ({ name, onClickDeleteContact }: ContactsListItemType) => {
  return (
    <ListItem
      disableGutters
      secondaryAction={
        <IconButton onClick={onClickDeleteContact} aria-label="delete">
          <Delete color="error" />
        </IconButton>
      }
    >
      <Typography variant="subtitle1" component="p" sx={{ textTransform: 'capitalize' }}>
        {name}
      </Typography>
    </ListItem>
  );
};
