import LoginForm from 'components/LoginForm/LoginForm';
import React from 'react';

const LoginPage = () => {
  return (
    <main className="main">
      <div className="main__container no-paddings">
        <h1>LoginPage</h1>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
