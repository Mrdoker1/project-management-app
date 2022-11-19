import { IPoint } from 'interfaces/IPoint';
import { IToken } from 'interfaces/IToken';
import { api } from '../api';

const files = api.injectEndpoints({
  endpoints: (build) => ({
    getPoints: build.query<IPoint[], { ids: string; userId: string }>({
      query: ({ ids, userId }) => `/points?ids=${ids}&userId=${userId}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    getPointsByTaskId: build.query<IPoint[], string>({
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
    updatePointsSet: build.mutation<IToken, Array<{ _id: string; done: boolean }>>({
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
    deletePoint: build.mutation<IToken, string>({
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
  useDeletePointMutation,
} = files;
