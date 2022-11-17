import { RootState } from './store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'managerAppApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://final-task-backend-production-3625.up.railway.app',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

//export const { useGetBoardsQuery } = api;
