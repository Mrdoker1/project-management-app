import { Button, CloseButton, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { checkPassword, getErrorMessage, removeObjKey } from 'utils/helpers';
import React, { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useSignupMutation } from 'store/api/auth';
import { setToken } from 'store/authSlice';
import cl from './SignupForm.module.css';
import users from 'store/api/users';
import { setProfile } from 'store/profileSlice';
import { useTranslation } from 'react-i18next';

interface ISignupForm {
  name: string;
  login: string;
  password: string;
}

const SignupForm = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [signup, { error: signupError }] = useSignupMutation();
  const [login, { error: loginError }] = useLoginMutation();
  const [getUsers] = users.endpoints.getUsers.useLazyQuery();
  const error = signupError || loginError;
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<ISignupForm>({
    initialValues: { name: '', login: '', password: '' },
    validate: (values) => ({
      name: values.name.length < 3 ? 'Too short name at least 3' : null,
      login: values.login.length < 3 ? 'Too short login at least 3' : null,
      password: checkPassword(values.password),
    }),
  });

  const sendForm = useCallback(async (values: ISignupForm) => {
    try {
      setIsLoading(true);
      await signup(values).unwrap();
      const auth = removeObjKey(values, 'name');
      const token = await login(auth).unwrap();
      dispatch(setToken(token));

      const data = await getUsers().unwrap();
      const user = data.find((user) => user.login === values.login);
      if (!user) throw new Error('User not exists!');
      dispatch(setProfile(user));

      navigate('/projects');
    } catch (err) {
      setIsLoading(false);
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
        {t('Sign up')}
      </Title>
      <TextInput
        classNames={nameClasses}
        label={t('Name')}
        {...form.getInputProps('name')}
        autoFocus
        autoComplete="username"
      />
      <TextInput
        classNames={loginClasses}
        label={t('Login')}
        {...form.getInputProps('login')}
        autoComplete="username"
      />
      <PasswordInput
        classNames={passwordClasses}
        label={t('Password')}
        {...form.getInputProps('password')}
        autoComplete="current-password"
      />
      <p className={cl.answer}>
        {t('Already have an account?')}
        <NavLink to="/login" className={cl.link}>
          {t('Come in')}
        </NavLink>
      </p>
      <p className={cl.message}>{message}</p>
      <Button loading={isLoading} className={cl.submit} type="submit">
        {t('Create an account')}
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

const nameClasses = { input: cl.name, root: cl.inputWrapper, label: cl.label };
const loginClasses = { input: cl.login, root: cl.inputWrapper, label: cl.label };
const passwordClasses = {
  input: cl.password,
  root: cl.inputWrapper,
  label: cl.label,
  innerInput: cl.innerInput,
  rightSection: cl.rightSection,
  visibilityToggle: cl.visibilityToggle,
};

export default SignupForm;
