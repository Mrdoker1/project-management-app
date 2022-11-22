import SignupForm from 'components/SignupForm/SignupForm';
import React, { memo } from 'react';
import cl from './SignupPage.module.css';
import checkIco from '../../assets/check-ico.svg';

const SignupPage = memo(() => {
  return (
    <main className="main page-signup animated-background animated-background--bottomRight">
      <div className="container page-wrapper">
        <section className={cl.wrapper}>
          <div className={cl.titleBlock}>
            <div className={cl.subTitle}>
              <img src={checkIco} />
              Project Management App
            </div>
            <h3>Everything you need in one place</h3>
            <p>Manage your boards using Drag-n-Drop, create adittional boards and tasks.</p>
          </div>
          <SignupForm />
        </section>
      </div>
    </main>
  );
});

export default SignupPage;
