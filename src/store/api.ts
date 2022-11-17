import { IBoard } from './../interfaces/IBoard';
import { RootState } from './store';
import { IToken } from '../interfaces/IToken';
import { IAuthInfo } from '../interfaces/IAuthInfo';
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
  endpoints: (build) => ({
    login: build.mutation<IToken, IAuthInfo>({
      query: (authInfo) => ({
        url: '/auth/signin',
        method: 'POST',
        body: authInfo,
      }),
    }),
    getBoards: build.query<IBoard[], void>({
      query: () => `/boards`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
  }),
});

export const { useLoginMutation, useGetBoardsQuery } = api;
