import React from 'react';
import cl from './SignupForm.module.css';

const SignupForm = () => {
  // function clickHandler() {
  //   dispatch()
  // }

  return (
    <form className={cl.form}>
      <input className={cl.name} placeholder="enter name" />
      <input className={cl.login} placeholder="enter login" />
      <input className={cl.password} type="password" placeholder="enter password" />
      <button className={cl.submit}>Зарегистрироваться</button>
    </form>
  );
};

export default SignupForm;
