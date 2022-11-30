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
import users from 'store/api/users';
import { setProfile } from 'store/profileSlice';
import { useTranslation } from 'react-i18next';

interface ILoginForm {
  login: string;
  password: string;
}

const LoginForm = memo(() => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [getUsers] = users.endpoints.getUsers.useLazyQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm<ILoginForm>({
    initialValues: { login: '', password: '' },
    validate: (values) => ({
      login: values.login.length < 3 ? 'Too short login at least 3' : null,
      password: checkPassword(values.password),
    }),
  });

  const sendForm = useCallback(async (values: ILoginForm, _event: React.FormEvent) => {
    _event.preventDefault();
    try {
      const token = await login(values).unwrap();
      dispatch(setToken(token));
      const data = await getUsers().unwrap();
      const user = data.find((user) => user.login === values.login);
      if (!user) throw new Error('User not exists!');
      dispatch(setProfile(user));
      //navigate('/projects');
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
        {t('Sign in')}
      </Title>
      <TextInput
        classNames={loginClasses}
        label={t('Login')}
        {...form.getInputProps('login')}
        autoFocus
        autoComplete="username"
      />
      <PasswordInput
        classNames={passwordClasses}
        label={t('Password')}
        {...form.getInputProps('password')}
        autoComplete="current-password"
      />
      <p className={cl.answer}>
        {t("Don't have an account?")}
        <NavLink to="/signup" className={cl.link}>
          {t('Register')}
        </NavLink>
      </p>
      <p className={cl.message}>{message}</p>
      <Button loading={isLoading} className={cl.submit} type="submit">
        {t('Sign in')}
      </Button>
      <CloseButton
        onClick={closeHandler}
        size={24}
        className={cl.closeBtn}
        aria-label="Close modal"
        title="back to home page"
      />
    </form>
  );
});

const loginClasses = {
  input: cl.login,
  root: cl.inputWrapper,
  label: cl.label,
};

const passwordClasses = {
  input: cl.password,
  root: cl.inputWrapper,
  label: cl.label,
  innerInput: cl.innerInput,
  rightSection: cl.rightSection,
  visibilityToggle: cl.visibilityToggle,
};

export default LoginForm;
