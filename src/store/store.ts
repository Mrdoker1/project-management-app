import { api } from './api';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import checkTokenMW from './checkTokenMW';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(checkTokenMW, api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
