import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import AppRouter from 'components/AppRouter/AppRouter';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import './App.css';
import './i18n';
import store from 'store/store';
import initApp from 'utils/initApp';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Open Sans',
        headings: { fontFamily: 'Open Sans' },
      }}
    >
      <NotificationsProvider>
        <ModalsProvider>
          <Provider store={store}>
            <HashRouter>
              <AppRouter />
            </HashRouter>
          </Provider>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

initApp();

export default App;
