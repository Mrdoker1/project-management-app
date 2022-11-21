import { Button, Group } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { api } from 'store/api';
import { selectToken, setToken } from 'store/authSlice';
import { useStyles } from '../HeaderStyles';

const LoginButtons = memo(() => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const { classes } = useStyles();
  const { t } = useTranslation();

  function clickHandler(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(setToken({ token: '' }));
    dispatch(api.util.resetApiState());
  }

  return (
    <Group spacing={10} className={classes.hiddenMobile}>
      {token ? (
        <Link to="/" onClick={clickHandler}>
          <Button className="button button--subtle" variant="subtle" radius={8} sx={{ height: 39 }}>
            {t('Sign Out')}
          </Button>
        </Link>
      ) : (
        <>
          <Link to="/login">
            <Button
              className="button button--subtle"
              variant="subtle"
              radius={8}
              sx={{ height: 39 }}
            >
              {t('Login')}
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              className="button button--outline"
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
