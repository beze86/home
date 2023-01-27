import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent, List, Stack, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { contactsApi } from 'client/modules/home-tasks/api/contact/contact';
import { ContactsListItem } from 'client/modules/home-tasks/ui/contact/ContactsListItem';

const STALE_TIME_5_MIN = 300000;

const CONTACT_LIST_QUERY = ['contacts', 'contact-list'];

const ContactsList = () => {
  const navigate = useNavigate();
  const { createContact, deleteContact, getAllContactsByUser } = contactsApi();
  const contactListQuery = useQueryClient();

  const { data: contacts } = useQuery(CONTACT_LIST_QUERY, () => getAllContactsByUser(), {
    suspense: false,
    staleTime: STALE_TIME_5_MIN,
  });

  const {
    handleSubmit,
    control,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const { mutate: mutateCreateContact } = useMutation((data: { name: string }) => createContact(data), {
    onSuccess: () => {
      resetForm();
      contactListQuery.invalidateQueries(CONTACT_LIST_QUERY);
    },
  });

  const { mutate: mutateDeleteContact } = useMutation((id: string) => deleteContact(id), {
    onSuccess: () => contactListQuery.invalidateQueries(CONTACT_LIST_QUERY),
  });

  if (!contacts) return null;

  const handleDeleteClick = (id: string) => {
    mutateDeleteContact(id);
  };

  const handleEditClick = (id: string) => {
    navigate(id);
  };

  const handleOnSubmitCreateTask = (data: { name: string }) => {
    mutateCreateContact({ ...data });
  };

  return (
    <Stack width="100%" maxWidth="600px" alignItems="center" justifyContent="center" margin="auto" gap={2}>
      <Card
        sx={{
          width: '100%',
        }}
      >
        <CardContent>
          <Stack
            component="form"
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            justifyContent="flex-end"
            gap={4}
            onSubmit={handleSubmit(handleOnSubmitCreateTask)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return <TextField {...field} label="Add new contact" />;
              }}
            />
            <Button type="submit">Add Contacts</Button>
          </Stack>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: '100%',
        }}
      >
        <CardContent>
          <List disablePadding>
            {contacts.map(({ name, _id }) => {
              return <ContactsListItem key={_id} name={name} id={_id} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />;
            })}
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ContactsList;
