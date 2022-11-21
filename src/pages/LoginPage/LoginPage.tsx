import LoginForm from 'components/LoginForm/LoginForm';
import React, { memo } from 'react';
import cl from './LoginPage.module.css';
import checkIco from '../../assets/check-ico.svg';

const LoginPage = memo(() => {
  return (
    <div className="container">
      <section className={cl.wrapper}>
        <div className={cl.titleBlock}>
          <div className={cl.subTitle}>
            <img src={checkIco} />
            Project Management App
          </div>
          <h3>Everything you need in one place</h3>
          <p>Manage your boards using Drag-n-Drop, create adittional boards and tasks.</p>
        </div>
        <LoginForm />
      </section>
    </div>
  );
});

export default LoginPage;
