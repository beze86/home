import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent, List, Stack, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { contactsApi } from 'client/modules/home-tasks/api/contact/contact';
import { ContactsListItem } from 'client/modules/home-tasks/ui/contact/ContactsListItem';

const STALE_TIME_5_MIN = 300000;

const CONTACT_LIST_QUERY = ['contacts', 'contact-list'];

export const ContactsList = () => {
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
    <>
      <Card
        sx={{
          width: '100%',
          maxWidth: '600px',
          m: 'auto',
          mb: 2,
        }}
      >
        <CardContent
          sx={{
            py: 4,
            px: 5,
            pb: 4,
            '&:last-child': {
              pb: 4,
            },
          }}
        >
          <Stack
            component="form"
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
            flexWrap="wrap"
            justifyContent={{ xs: 'flex-end', md: 'space-between' }}
            gap={4}
            onSubmit={handleSubmit(handleOnSubmitCreateTask)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    size="small"
                    label="Add new contact"
                    variant="outlined"
                    sx={{
                      flex: {
                        xs: '1 1 100%',
                        md: '1 0 auto',
                      },
                    }}
                  />
                );
              }}
            />
            <Button type="submit" variant="contained">
              Add Contacts
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: '100%',
          maxWidth: '600px',
          m: 'auto',
        }}
      >
        <CardContent
          sx={{
            py: 4,
            px: 5,
            pb: 4,
            '&:last-child': {
              pb: 4,
            },
          }}
        >
          <List disablePadding>
            {contacts.map(({ name, _id }) => {
              return <ContactsListItem key={_id} name={name} id={_id} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />;
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
};
