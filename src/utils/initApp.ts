import { checkToken } from './helpers';

function initApp() {
  // window.addEventListener('beforeunload', () => {
  //   const state = store.getState();
  //   localStorage.setItem('auth', JSON.stringify(state.auth));
  // });
  checkToken();
}

export default initApp;
