import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { usersApi } from 'client/modules/auth/api/auth';
import { User } from 'client/modules/auth/domain/auth';
import { CenteredStack } from 'client/shared/components/CenteredStack/CenteredStack';
import { useSnackbar } from 'client/shared/hooks/useSnackbar';
import { useUserState } from 'client/shared/hooks/useUserState';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = usersApi();
  const { snackbar } = useSnackbar();

  const { control, handleSubmit } = useForm<Partial<User>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutateLogin = useMutation(
    async (submittedData: Partial<User>) => {
      const data = await login(submittedData);
      setStatesOnLogin(data);
      navigate('/tasks');
      return data;
    },
    {
      onError: () => snackbar('Failed to login', 'error'),
      onSuccess: ({ fullName }) => {
        snackbar(`Welcome ${fullName}`, 'success');
      },
    },
  );
  const { setStatesOnLogin } = useUserState();

  const handleLoginSubmit = (data: Partial<User>) => mutateLogin.mutate({ ...data });
  return (
    <CenteredStack>
      <Card>
        <CardContent
          sx={{
            '&.MuiCardContent-root': {
              padding: 8,
            },
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
                return <TextField {...props} label="Insert Email" onChange={onChange} />;
              }}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, ...props } }) => {
                return <TextField {...props} label="Insert password" onChange={onChange} />;
              }}
            />
            <LoadingButton type="submit" variant="contained" loading={mutateLogin.isLoading}>
              Log in
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
    </CenteredStack>
  );
};
