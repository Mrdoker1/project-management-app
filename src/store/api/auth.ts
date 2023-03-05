import { IUser } from 'interfaces/IUser';
import { IAuth } from 'interfaces/IAuth';
import { IToken } from 'interfaces/IToken';
import { api } from './../api';

const auth = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, Omit<IAuth, 'name'>>({
      query: (authInfo) => ({
        url: '/auth/signin',
        method: 'POST',
        body: authInfo,
      }),
      transformResponse: (response: IToken) => response.token,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    signup: build.mutation<IUser, IAuth>({
      query: (user) => ({
        url: '/auth/signup',
        method: 'POST',
        body: user,
      }),
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation } = auth;
