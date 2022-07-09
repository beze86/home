import React, { FormEvent, useState } from 'react';

import { Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';

import { usersApi } from 'client/modules/auth/api/auth';
import { useUserState } from 'client/shared/hooks/useUserState';

export const Login = () => {
  const [fields, setFields] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const { login } = usersApi();
  const { setStatesOnLogin } = useUserState();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await login(fields);
    setStatesOnLogin(data);
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
            p: 8,
          }}
        >
          <Typography variant="h4" mb={4}>
            Log in
          </Typography>
          <Stack component="form" onSubmit={handleLogin} gap={6}>
            <TextField
              size="small"
              label="Insert Email"
              variant="outlined"
              value={fields.email}
              onChange={(e) => setFields((state) => ({ ...state, email: e.target.value }))}
              sx={{
                flex: {
                  xs: '1 1 100%',
                  md: '1 0 auto',
                },
              }}
            />
            <TextField
              size="small"
              label="Insert password"
              variant="outlined"
              value={fields.password}
              onChange={(e) => setFields((state) => ({ ...state, password: e.target.value }))}
              sx={{
                flex: {
                  xs: '1 1 100%',
                  md: '1 0 auto',
                },
              }}
            />
            <Button type="submit" variant="contained">
              Log in
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
