import { isExpired } from 'react-jwt';
import { setToken } from 'store/authSlice';
import store from 'store/store';

function initApp() {
  window.addEventListener('beforeunload', () => {
    const auth = store.getState().auth;
    const profile = store.getState().profile;
    const settings = store.getState().settings;
    localStorage.setItem('auth', JSON.stringify(auth));
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('settings', JSON.stringify(settings));
  });
  checkToken();
}

function checkToken() {
  const token = store.getState().auth.token;
  if (!token) return;
  if (isExpired(token)) {
    store.dispatch(setToken(''));
    console.log('Token has expired!');
  }
}

export default initApp;
