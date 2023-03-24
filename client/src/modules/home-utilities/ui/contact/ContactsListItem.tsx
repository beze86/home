import { faTrash } from '@fortawesome/pro-solid-svg-icons';
import { IconButton, ListItem, Typography } from '@mui/material';

import { ContactCreation } from 'client/modules/home-utilities/domain/contact/contact';
import { Icon } from 'client/shared/components';

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
          <Icon icon={faTrash} size="18px" color="error.main" />
        </IconButton>
      }
    >
      <Typography variant="subtitle1" component="p" sx={{ textTransform: 'capitalize' }}>
        {name}
      </Typography>
    </ListItem>
  );
};
