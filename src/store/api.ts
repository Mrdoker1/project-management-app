import { RootState } from './store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://final-task-backend-production-3ebe.up.railway.app',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-type', 'application/json');
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Board', 'Column', 'Task'],
});
