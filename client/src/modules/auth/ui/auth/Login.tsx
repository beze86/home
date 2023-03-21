import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { usersApi } from 'client/modules/auth/api/auth';
import { UserLogin } from 'client/modules/auth/domain/auth';
import { useSnackbar } from 'client/shared/hooks/useSnackbar';
import { useUserState } from 'client/shared/hooks/useUserState';
import { Page } from 'client/shared/layouts';
import { emailRegexValidation } from 'client/shared/utils';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = usersApi();
  const { snackbar } = useSnackbar();
  const { setStatesOnLogin } = useUserState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutateLogin = useMutation(
    async (submittedData: UserLogin) => {
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

  const handleLoginSubmit = (data: UserLogin) => mutateLogin.mutate({ ...data });

  const emailHasErrors = errors.email?.type === 'pattern' || errors.email?.type === 'required';

  const passwordHasErrors = errors.password?.type === 'required';

  return (
    <Page>
      <Page.Main>
        <Card sx={{ maxWidth: '600px', margin: '0 auto' }}>
          <CardContent
            sx={{
              '&.MuiCardContent-root': {
                padding: 8,
              },
            }}
          >
            <Typography variant="h4" mb={4}>
              Login
            </Typography>
            <Stack component="form" onSubmit={handleSubmit(handleLoginSubmit)} gap={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: {
                    message: 'Email is required',
                    value: true,
                  },
                  pattern: {
                    value: emailRegexValidation,
                    message: 'Email is not valid',
                  },
                }}
                render={({ field: { onChange, ...props } }) => {
                  return (
                    <TextField
                      {...props}
                      label="Insert Email"
                      onChange={onChange}
                      helperText={emailHasErrors && errors.email?.message}
                      error={emailHasErrors}
                    />
                  );
                }}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: {
                    message: 'Password is required',
                    value: true,
                  },
                }}
                render={({ field: { onChange, ...props } }) => {
                  return (
                    <TextField
                      {...props}
                      type="password"
                      label="Insert password"
                      onChange={onChange}
                      helperText={passwordHasErrors && errors.password?.message}
                      error={passwordHasErrors}
                    />
                  );
                }}
              />
              <LoadingButton type="submit" variant="contained" loading={mutateLogin.isLoading}>
                Login
              </LoadingButton>
            </Stack>
          </CardContent>
        </Card>
      </Page.Main>
    </Page>
  );
};
