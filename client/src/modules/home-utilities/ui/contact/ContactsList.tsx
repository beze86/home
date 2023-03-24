import { useForm, Controller } from 'react-hook-form';

import { Button, Card, CardContent, List, Stack, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ContactCreation, ContactId } from 'client/modules/home-utilities/domain/contact/contact';
import { Api } from 'client/modules/home-utilities/ui/';
import { ContactsListItem } from 'client/modules/home-utilities/ui/contact/ContactsListItem';
import { Page } from 'client/shared/layouts';

const STALE_TIME_5_MIN = 300000;

const CONTACT_LIST_QUERY = ['contacts', 'contact-list'];

const ContactsList = () => {
  const contactListQuery = useQueryClient();

  const { data: contacts } = useQuery(CONTACT_LIST_QUERY, () => Api.getContacts(), {
    suspense: false,
    staleTime: STALE_TIME_5_MIN,
  });

  const {
    handleSubmit,
    control,
    reset: resetForm,
  } = useForm<ContactCreation>({
    defaultValues: {
      name: '',
    },
  });

  const { mutate: mutateCreateContact } = useMutation((data: ContactCreation) => Api.createContact(data), {
    onSuccess: () => {
      resetForm();
      contactListQuery.invalidateQueries(CONTACT_LIST_QUERY);
    },
  });

  const { mutate: mutateDeleteContact } = useMutation((id: ContactId) => Api.deleteContact(id), {
    onSuccess: () => contactListQuery.invalidateQueries(CONTACT_LIST_QUERY),
  });

  if (!contacts) return null;

  const handleDeleteClick = (id: ContactId) => {
    mutateDeleteContact(id);
  };

  const handleOnSubmitCreateContact = (data: ContactCreation) => {
    mutateCreateContact({ ...data });
  };

  return (
    <Page>
      <Page.Main>
        <Card sx={{ maxWidth: '600px', marginX: 'auto', marginBottom: 3 }}>
          <CardContent>
            <Stack
              component="form"
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="flex-end"
              gap={4}
              onSubmit={handleSubmit(handleOnSubmitCreateContact)}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => {
                  return <TextField {...field} label="Add new contacts" />;
                }}
              />
              <Button type="submit">Add Contacts</Button>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: '600px', marginX: 'auto' }}>
          <CardContent>
            <List disablePadding>
              {contacts.map(({ name, _id }) => {
                return <ContactsListItem key={_id} name={name} onClickDeleteContact={() => handleDeleteClick(_id)} />;
              })}
            </List>
          </CardContent>
        </Card>
      </Page.Main>
    </Page>
  );
};

export default ContactsList;
