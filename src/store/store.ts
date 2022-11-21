import { api } from './api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import boardsReducer from './boardsSlice';
import authReducer from './authSlice';

// const rootReducer = combineReducers({
//   boardsReducer,
//   authReducer,
// });

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  boards: boardsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
