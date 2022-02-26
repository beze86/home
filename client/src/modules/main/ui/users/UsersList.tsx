import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Card, CardContent, List, TextField } from '@mui/material';

import { usersApi } from 'client/modules/main/api/user';
import { User } from 'client/modules/main/type/user';
import { UsersListItem } from 'client/modules/main/ui/users/UsersListItem';

export const UsersList = () => {
  const navigate = useNavigate();
  const { createUser, deleteUser, getAllUsers } = usersApi();
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const dataOnSuccess = async () => {
      const { data } = await getAllUsers();
      setUsers(data);
    };
    dataOnSuccess();
  }, []);

  const handleDeleteClick = async (id: string) => {
    await deleteUser(id);
    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);
  };

  const handleEditClick = (id: string) => {
    navigate(id);
  };

  const handleCreateTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await createUser(userName);
    setUsers((prev) => [...prev, { _id: data.insertedId, user: userName }]);
    setUserName('');
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
              label="Add new User/s"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{
                flex: {
                  xs: '1 1 100%',
                  md: '1 0 auto',
                },
              }}
            />
            <Button type="submit" variant="contained">
              Add User
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
            {users.map(({ user, _id }) => {
              return (
                <UsersListItem
                  key={_id}
                  user={user}
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
