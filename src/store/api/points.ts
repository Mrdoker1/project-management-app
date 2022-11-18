import { IPoint } from 'interfaces/IPoint';
import { IUser } from 'interfaces/IUser';
import { IToken } from 'interfaces/IToken';
import { api } from '../api';

const files = api.injectEndpoints({
  endpoints: (build) => ({
    getPoints: build.query<IPoint[], { ids: Array<Pick<IPoint, '_id'>>, userId: Pick<IUser, '_id'> }>({
      query: ({ ids, userId }) => `/points?ids=${ids}&userId=${userId}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    getPointsByTaskId: build.query<IPoint[], Pick<IPoint, 'taskId'>>({
      query: (taskId) => `/points/${taskId}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    createPoint: build.mutation<IToken, Omit<IPoint, '_id'>>({
        query: (point) => ({
          url: `/points`,
          method: 'POST',
          body: point,
        }),
    }),
    updatePointsSet: build.mutation<IToken, Array<{"_id": Pick<IPoint, '_id'>,  "done": Pick<IPoint, 'done'>}>>({
      query: (patch) => ({
        url: `/points`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    updatePoint: build.mutation<IToken, IPoint>({
      query: (point) => ({
        url: `/points/${point._id}`,
        method: 'PATCH',
        body: point,
      }),
    }),
    deletePoint: build.mutation<IToken, Pick<IPoint, '_id'>>({
      query: (pointId) => ({
        url: `/points/${pointId}`,
        method: 'DELETE',
      }),
  }),
  }),
  overrideExisting: false,
});

export const {
  useGetPointsQuery,
  useCreatePointMutation,
  useUpdatePointMutation,
  useUpdatePointsSetMutation,
  useGetPointsByTaskIdQuery,
  useDeletePointMutation
} = files;
