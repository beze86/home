import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent, List, Stack, TextField } from '@mui/material';

import { contactsApi } from 'client/modules/contacts/api/contact';
import { Contact } from 'client/modules/contacts/type/contact';
import { ContactsListItem } from 'client/modules/contacts/ui/contacts/ContactsListItem';

export const ContactsList = () => {
  const navigate = useNavigate();
  const { createContact, deleteContact, getAllContactsByUser } = contactsApi();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactName, setContactName] = useState('');

  useEffect(() => {
    const dataOnSuccess = async () => {
      const { data } = await getAllContactsByUser();
      setContacts(data);
    };
    dataOnSuccess();
  }, []);

  const handleDeleteClick = async (id: string) => {
    await deleteContact(id);
    const newContacts = contacts.filter((contact) => contact._id !== id);
    setContacts(newContacts);
  };

  const handleEditClick = (id: string) => {
    navigate(id);
  };

  const handleCreateTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await createContact(contactName);
    setContacts((prev) => [...prev, { _id: data.insertedId, fullName: contactName }]);
    setContactName('');
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
            onSubmit={handleCreateTaskSubmit}
          >
            <TextField
              size="small"
              label="Add new contact"
              variant="outlined"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              sx={{
                flex: {
                  xs: '1 1 100%',
                  md: '1 0 auto',
                },
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
            {contacts.map(({ fullName, _id }) => {
              return (
                <ContactsListItem key={_id} fullName={fullName} id={_id} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
};
