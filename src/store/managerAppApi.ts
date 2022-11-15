import { IToken } from './../interfaces/IToken';
import { IAuthInfo } from '../interfaces/IAuthInfo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'managerAppApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://final-task-backend-production-3625.up.railway.app',
  }),
  endpoints: (builder) => ({
    getToken: builder.mutation<IToken, IAuthInfo>({
      query: (authInfo) => ({
        url: '/auth/signin',
        method: 'POST',
        body: authInfo,
      }),
    }),
    // getPokemonByName: builder.query<Pokemon, string>({
    //   query: (name) => `pokemon/${name}`,
    // }),
  }),
});

export const { useGetTokenMutation } = api;
