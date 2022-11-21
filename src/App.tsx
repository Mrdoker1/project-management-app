import { MantineProvider } from '@mantine/core';
import AppRouter from 'components/AppRouter/AppRouter';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from 'store/store';
import initApp from 'utils/initApp';
import './App.css';

function App() {
  return (
    <MantineProvider
      withNormalizeCSS
      theme={{
        fontFamily: 'Open Sans',
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
