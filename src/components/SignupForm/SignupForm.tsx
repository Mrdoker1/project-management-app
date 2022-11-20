import { Button, CloseButton, Loader, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { checkPassword, getErrorMessage, removeObjKey } from 'utils/helpers';
import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useSignupMutation } from 'store/api/auth';
import { setToken } from 'store/authSlice';
import cl from './SignupForm.module.css';

interface ISignupForm {
  name: string;
  login: string;
  password: string;
}

const SignupForm = memo(() => {
  const [signup, { isLoading: isSignupLoading, error: signupError }] = useSignupMutation();
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const isLoading = isSignupLoading || isLoginLoading;
  const error = signupError || loginError;

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
      await signup(values).unwrap();
      const auth = removeObjKey(values, 'name');
      const token = await login(auth).unwrap();
      await dispatch(setToken(token));
      navigate('/projects');
    } catch (err) {
      console.log(err);
    }
  }, []);

  const closeHandler = useCallback(() => {
    navigate('/');
  }, []);

  const message = error ? getErrorMessage(error) : isLoading ? <Loader color="dark" /> : '';

  return (
    <form onSubmit={form.onSubmit(sendForm)} className={cl.form} autoComplete="off">
      <Title className={cl.title} order={3}>
        Sign up
      </Title>
      <TextInput classNames={nameClasses} label="Name" {...form.getInputProps('name')} />
      <TextInput classNames={loginClasses} label="Login" {...form.getInputProps('login')} />
      <PasswordInput
        classNames={passwordClasses}
        label="Password"
        {...form.getInputProps('password')}
        autoComplete="off"
      />
      <p className={cl.answer}>
        {'Already have an account?'}
        <NavLink to="/login" className={cl.link}>
          Sign in
        </NavLink>
      </p>
      <p className={cl.message}>{message}</p>
      <Button className={cl.submit} type="submit">
        Create an account
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
