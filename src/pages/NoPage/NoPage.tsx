import { Button } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cl from './NoPage.module.css';

const NoPage = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="main page-404 animated-background animated-background--topRight">
      <div className="container page-wrapper">
        <h1 className={cl.pageTitle}>{t('Sorry! Page not found')}</h1>
        <p className={cl.pageDescription}>
          {t('Head homepage or use the search to find what you`re looking for')}
        </p>
        <Button
          onClick={() => {
            navigate('/');
          }}
          className="button"
          color="cyan"
          radius={8}
          sx={{ height: 36 }}
          styles={() => ({
            root: {
              fontSize: '18px',
              lineHeight: '155%',
              position: 'relative',
              zIndex: 10,
            },
          })}
        >
          {t('Back to HomePage')}
        </Button>
      </div>
    </main>
  );
});

export default NoPage;
