import { api } from './api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardsReducer from './boardsSlice';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import settingsReducer from './settingsSlice';
import usersReducer from './usersSlice';
import menuSlice from './menuSlice';
import checkTokenMW from './checkTokenMW';
import profileMenuSlice from './profileMenuSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  boards: boardsReducer,
  profile: profileReducer,
  settings: settingsReducer,
  users: usersReducer,
  menu: menuSlice,
  profileMenu: profileMenuSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, checkTokenMW),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
