import SignupForm from 'components/SignupForm/SignupForm';
import React from 'react';

const SignupPage = () => {
  return (
    <main className="main">
      <div className="main__container no-paddings">
        <h1>SignupPage</h1>
        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;
