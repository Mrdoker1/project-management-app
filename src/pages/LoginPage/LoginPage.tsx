import LoginForm from 'components/LoginForm/LoginForm';
import React, { memo } from 'react';
import cl from './LoginPage.module.css';
import checkIco from '../../assets/check-ico.svg';
import { useTranslation } from 'react-i18next';

const LoginPage = memo(() => {
  const { t } = useTranslation();

  return (
    <main className="main page-login animated-background animated-background--bottomRight">
      <div className="container page-wrapper">
        <section className={cl.wrapper}>
          <div className={cl.titleBlock}>
            <div className={cl.subTitle}>
              <img src={checkIco} />
              {t('Project Management App')}
            </div>
            <h3>{t('Everything you need in one place')}</h3>
            <p>{t('Manage your boards using Drag-n-Drop, create adittional boards and tasks.')}</p>
          </div>
          <LoginForm />
        </section>
      </div>
    </main>
  );
});

export default LoginPage;
