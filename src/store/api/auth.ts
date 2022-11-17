import { IAuthInfo } from 'interfaces/IAuthInfo';
import { IToken } from 'interfaces/IToken';
import { api } from './../api';

const auth = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IToken, IAuthInfo>({
      query: (authInfo) => ({
        url: '/auth/signin',
        method: 'POST',
        body: authInfo,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = auth;
