import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'store/api/auth';
import { setToken } from 'store/authSlice';
import cl from './LoginForm.module.css';

const LoginForm = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formState = { login: 'test', password: 'test' };

  async function clickHandler(e: React.MouseEvent) {
    e.preventDefault();
    try {
      const token = await login(formState).unwrap();
      await dispatch(setToken(token));
      navigate('/projects');
    } catch (err) {
      console.log(err);
    }
  }

  //console.log(error);
  const message = error ? 'Ошибка' : isLoading ? 'Загрузка...' : 'Войти';

  return (
    <form className={cl.form}>
      <input className={cl.login} placeholder="enter login" />
      <input className={cl.password} type="password" placeholder="enter password" />
      <button className={cl.submit} onClick={clickHandler}>
        {message}
      </button>
    </form>
  );
};

export default LoginForm;
