import { IBoard } from './../../interfaces/IBoard';
import { api } from './../api';

export const boards = api.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<IBoard[], void>({
      query: () => 'boards',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Board' as const, _id })),
              { type: 'Board', id: 'LIST' },
            ]
          : [{ type: 'Board', id: 'LIST' }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    createBoard: build.mutation<IBoard, Omit<IBoard, '_id'>>({
      query: (body) => ({
        url: `boards`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    getBoard: build.query<IBoard, string>({
      query: (id) => `boards/${id}`,
      providesTags: (result, error, id) => [{ type: 'Board', id }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    updateBoard: build.mutation<IBoard, IBoard>({
      query: ({ _id, ...patch }) => ({
        url: `boards/${_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Board', _id }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    deleteBoard: build.mutation<IBoard, string>({
      query(id) {
        return {
          url: `boards/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Board', id },
        { type: 'Board', id: 'LIST' },
      ],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    getBoardsByIds: build.query<IBoard[], string[]>({
      query: (ids) => ({
        url: `boardsSet`,
        method: 'GET',
        params: { ids },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Board' as const, _id })),
              { type: 'Board', id: 'LIST' },
            ]
          : [{ type: 'Board', id: 'LIST' }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    getBoardsByUserId: build.query<IBoard[], string>({
      query: (id) => `boardsSet/${id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Board' as const, _id })),
              { type: 'Board', id: 'LIST' },
            ]
          : [{ type: 'Board', id: 'LIST' }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBoardQuery,
  useGetBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsByIdsQuery,
  useLazyGetBoardsByIdsQuery,
  useGetBoardsByUserIdQuery,
} = boards;
