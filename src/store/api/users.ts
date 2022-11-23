import { IUser } from './../../interfaces/IUser';
import { api } from './../api';

const users = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => 'users',
    }),

    getUser: build.query<IUser, string>({
      query: (id) => `users/${id}`,
    }),

    updateUser: build.mutation<IUser, IUser>({
      query: ({ _id, ...patch }) => ({
        url: `users/${_id}`,
        method: 'PUT',
        body: patch,
      }),
    }),

    deleteUser: build.mutation<IUser, string>({
      query(id) {
        return {
          url: `users/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } =
  users;

export default users;
