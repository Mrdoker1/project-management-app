import { Button, Group } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { api } from 'store/api';
import { setToken } from 'store/authSlice';
import cl from '../Header.module.css';

const LoginButtons = memo(() => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { t } = useTranslation();

  function clickHandler(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(setToken(''));
    dispatch(api.util.resetApiState());
  }

  return (
    <Group spacing={10} className={cl.hiddenMobile}>
      {token ? (
        <Link to="/" onClick={clickHandler}>
          <Button
            className={`${cl.button} ${cl.buttonSubtle}`}
            variant="subtle"
            radius={8}
            sx={{ height: 39 }}
          >
            {t('Sign Out')}
          </Button>
        </Link>
      ) : (
        <>
          <Link to="/login">
            <Button
              className={`${cl.button} ${cl.buttonSubtle}`}
              variant="subtle"
              radius={8}
              sx={{ height: 39 }}
            >
              {t('Login')}
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              className={`${cl.button} ${cl.buttonOutline}`}
              radius={8}
              variant="outline"
              sx={{ height: 39 }}
            >
              {t('Sign up')}
            </Button>
          </Link>
        </>
      )}
    </Group>
  );
});

export default LoginButtons;
