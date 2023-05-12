import { Controller, useForm } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Card, CardContent, Link, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { UserRegister } from 'client/modules/user/domain/user';
import { Api } from 'client/modules/user/ui';
import { useSnackbar } from 'client/shared/hooks/useSnackbar';
import { useUserState } from 'client/shared/hooks/useUserState';
import { Page } from 'client/shared/layouts';
import { emailRegexValidation } from 'client/shared/utils';

const Register = () => {
  const navigate = useNavigate();
  const { snackbar } = useSnackbar();
  const { loginUser } = useUserState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
    },
  });

  const mutateRegister = useMutation((data: UserRegister) => Api.register(data), {
    onError: (error: Error) => {
      snackbar(error.message, 'error');
    },
    onSuccess: (data) => {
      loginUser(data);
      navigate('/tasks');
      snackbar(`Welcome ${data.fullName}`, 'success');
    },
  });

  const handleRegisterSubmit = (data: UserRegister) => mutateRegister.mutate({ ...data });

  const emailHasErrors = errors.email?.type === 'pattern' || errors.email?.type === 'required';

  const fullNameHasErrors = errors.fullName?.type === 'required';

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
              Register
            </Typography>
            <Stack component="form" onSubmit={handleSubmit(handleRegisterSubmit)} gap={6}>
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
                      label="Insert email"
                      onChange={onChange}
                      helperText={emailHasErrors && errors.email?.message}
                      error={emailHasErrors}
                    />
                  );
                }}
              />
              <Controller
                name="fullName"
                control={control}
                rules={{
                  required: {
                    message: 'Name is required',
                    value: true,
                  },
                }}
                render={({ field: { onChange, ...props } }) => {
                  return (
                    <TextField
                      {...props}
                      type="text"
                      label="Insert name"
                      onChange={onChange}
                      helperText={fullNameHasErrors && errors.fullName?.message}
                      error={fullNameHasErrors}
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
              <Stack alignItems="center" gap={4}>
                <LoadingButton type="submit" variant="contained" sx={{ alignSelf: 'normal' }} loading={mutateRegister.isLoading}>
                  Register
                </LoadingButton>
                <Typography color="grey.500">or</Typography>
                <Link to="/login" component={RouterLink}>
                  Login
                </Link>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Page.Main>
    </Page>
  );
};

export { Register };
