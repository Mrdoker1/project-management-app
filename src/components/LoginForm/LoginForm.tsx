import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'store/api/auth';
import { setToken } from 'store/authSlice';
import cl from './LoginForm.module.css';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Title, CloseButton } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { checkPassword, getErrorMessage } from 'utils/helpers';

interface ILoginForm {
  login: string;
  password: string;
}

const LoginForm = memo(() => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<ILoginForm>({
    initialValues: { login: '', password: '' },
    validate: (values) => ({
      login: values.login.length < 3 ? 'Too short login at least 3' : null,
      password: checkPassword(values.password),
    }),
  });

  const sendForm = useCallback(async (values: ILoginForm) => {
    try {
      const token = await login(values).unwrap();
      await dispatch(setToken(token));
      navigate('/projects');
    } catch (err) {
      console.log(err);
    }
  }, []);

  const closeHandler = useCallback(() => {
    navigate('/');
  }, []);

  const message = error ? getErrorMessage(error) : '';

  return (
    <form onSubmit={form.onSubmit(sendForm)} className={cl.form}>
      <Title className={cl.title} order={3}>
        Sign in
      </Title>
      <TextInput
        classNames={loginClasses}
        label="Login"
        {...form.getInputProps('login')}
        autoFocus
        autoComplete="username"
      />
      <PasswordInput
        classNames={passwordClasses}
        label="Password"
        {...form.getInputProps('password')}
        autoComplete="current-password"
      />
      <p className={cl.answer}>
        {"Don't have an account?"}
        <NavLink to="/signup" className={cl.link}>
          Sign up
        </NavLink>
      </p>
      <p className={cl.message}>{message}</p>
      <Button loading={isLoading} loaderPosition="center" className={cl.submit} type="submit">
        Sign in
      </Button>
      <CloseButton
        onClick={closeHandler}
        size={24}
        className={cl.closeBtn}
        aria-label="Close modal"
        title="back to home"
      />
    </form>
  );
});

const loginClasses = { input: cl.login, root: cl.inputWrapper, label: cl.label };
const passwordClasses = {
  input: cl.password,
  root: cl.inputWrapper,
  label: cl.label,
  innerInput: cl.innerInput,
  rightSection: cl.rightSection,
  visibilityToggle: cl.visibilityToggle,
};

export default LoginForm;
