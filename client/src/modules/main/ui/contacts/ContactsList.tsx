import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Card, CardContent, List, TextField } from '@mui/material';

import { contactsApi } from 'client/modules/main/api/contact';
import { Contact } from 'client/modules/main/type/contact';
import { ContactsListItem } from 'client/modules/main/ui/contacts/ContactsListItem';

export const ContactsList = () => {
  const navigate = useNavigate();
  const { createContact, deleteContact, getAllContacts } = contactsApi();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactName, setContactName] = useState('');

  useEffect(() => {
    const dataOnSuccess = async () => {
      const { data } = await getAllContacts();
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
          <Box
            component="form"
            onSubmit={handleCreateTaskSubmit}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: {
                xs: 'flex-end',
                md: 'space-between',
              },
              flexWrap: 'wrap',
              gap: 4,
            }}
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
              Add Contact
            </Button>
          </Box>
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
                <ContactsListItem
                  key={_id}
                  fullName={fullName}
                  id={_id}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                />
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
};
