import { MantineProvider } from '@mantine/core';
import AppRouter from 'components/AppRouter/AppRouter';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import './App.css';
import './i18n';
import store from 'store/store';
import initApp from 'utils/initApp';

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Open Sans',
        headings: { fontFamily: 'Open Sans' },
      }}
    >
      <Provider store={store}>
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </Provider>
    </MantineProvider>
  );
}

initApp();

export default App;
