import { getRandom, removeObjKey } from 'components/utils/helpers';
import { IAuth } from 'interfaces/IAuth';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useSignupMutation } from 'store/api/auth';
import { setToken } from 'store/authSlice';
import cl from './SignupForm.module.css';

const SignupForm = () => {
  const [signup, { isLoading: isSignupLoading, error: signupError, isSuccess }] =
    useSignupMutation();
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const isLoading = isSignupLoading || isLoginLoading;
  const error = signupError || loginError;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const randNumber = getRandom(1, 999999);
  const password = 'test';
  const formState: IAuth = { name: 'test' + randNumber, login: 'test' + randNumber, password };
  const auth = removeObjKey<IAuth>(formState, 'name');

  async function clickHandler(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await signup(formState).unwrap();
      const token = await login(auth).unwrap();
      await dispatch(setToken(token));
      navigate('/projects');
    } catch (err) {
      console.log(err);
    }
  }

  const message = error
    ? `Ошибка ${error}`
    : isLoading || isSuccess
    ? 'Загрузка...'
    : 'Зарегистрироваться';

  return (
    <form className={cl.form}>
      <input className={cl.name} placeholder="enter name" />
      <input className={cl.login} placeholder="enter login" />
      <input className={cl.password} type="password" placeholder="enter password" />
      <button className={cl.submit} onClick={clickHandler}>
        {message}
      </button>
    </form>
  );
};

export default SignupForm;
