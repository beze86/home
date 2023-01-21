import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { usersApi } from 'client/modules/auth/api/auth';
import { User } from 'client/modules/auth/type/auth';
import { useUserState } from 'client/shared/hooks/useUserState';

export const Login = () => {
  const { login } = usersApi();

  const { control, handleSubmit } = useForm<Partial<User['data']>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutateLogin = useMutation(async (submittedData: Partial<User['data']>) => {
    const { data } = await login(submittedData);
    setStatesOnLogin(data);
  });
  const { setStatesOnLogin } = useUserState();

  const handleLoginSubmit = (data: Partial<User['data']>) => mutateLogin.mutate({ ...data });
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
          <Stack component="form" onSubmit={handleSubmit(handleLoginSubmit)} gap={6}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, ...props } }) => {
                return (
                  <TextField
                    {...props}
                    size="small"
                    label="Insert Email"
                    variant="outlined"
                    onChange={onChange}
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
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, ...props } }) => {
                return (
                  <TextField
                    {...props}
                    size="small"
                    label="Insert password"
                    variant="outlined"
                    onChange={onChange}
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
            <LoadingButton type="submit" variant="contained" loading={mutateLogin.isLoading}>
              Log in
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
