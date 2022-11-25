import { Button } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { api } from 'store/api';
import { setToken } from 'store/authSlice';
import { setMenuState } from 'store/menuSlice';
import { clearProfile } from 'store/profileSlice';
import cl from '../Header.module.css';

const LoginButtons = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const signOutHandler = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    dispatch(setToken(''));
    dispatch(clearProfile);
    dispatch(api.util.resetApiState());
    dispatch(setMenuState(false));
  }, []);

  const signInHandler = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/login');
    dispatch(setMenuState(false));
  }, []);

  const signUpHandler = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/signup');
    dispatch(setMenuState(false));
  }, []);

  return (
    <>
      {token ? (
        <Button
          className={`${cl.button} ${cl.buttonSubtle}`}
          variant="subtle"
          radius={8}
          sx={{ height: 39 }}
          onClick={signOutHandler}
        >
          {t('Sign Out')}
        </Button>
      ) : (
        <>
          <Button
            className={`${cl.button} ${cl.buttonSubtle}`}
            variant="subtle"
            radius={8}
            sx={{ height: 39 }}
            onClick={signInHandler}
          >
            {t('Sign in')}
          </Button>

          <Button
            className={`${cl.button} ${cl.buttonOutline}`}
            radius={8}
            variant="outline"
            sx={{ height: 39 }}
            onClick={signUpHandler}
          >
            {t('Sign up')}
          </Button>
        </>
      )}
    </>
  );
});

export default LoginButtons;
