import { IAuthInfo } from 'interfaces/IAuthInfo';
import React from 'react';
import { useGetTokenMutation } from 'store/managerAppApi';
import './App.css';

function App() {
  const authInfo: IAuthInfo = {
    login: 'test',
    password: 'test',
  };

  const [getToken, result] = useGetTokenMutation();

  console.log(result);
  function clickHandler() {
    getToken(authInfo);
  }

  return (
    <div className="App">
      <h1>Project Manager App</h1>
      <button onClick={clickHandler}>Sign in</button>
    </div>
  );
}

export default App;
