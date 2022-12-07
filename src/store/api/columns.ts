import { IToken } from 'interfaces/IToken';
import { IColumn } from './../../interfaces/IColumn';
import { api } from './../api';

const columns = api.injectEndpoints({
  endpoints: (build) => ({
    getColumns: build.query<IColumn[], string>({
      query: (boardId) => `/boards/${boardId}/columns`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Column' as const, _id })),
              { type: 'Column', id: 'LIST' },
            ]
          : [{ type: 'Column', id: 'LIST' }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    createColumn: build.mutation<IColumn, Omit<IColumn, '_id'>>({
      query: ({ title, order, boardId }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body: { title, order },
      }),
      invalidatesTags: [{ type: 'Column', id: 'LIST' }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    getColumnById: build.query<IColumn[], { boardId: string; _id: string }>({
      query: ({ _id, boardId }) => `/boards/${boardId}/columns/${_id}`,
      providesTags: (result, error, { _id }) => [{ type: 'Column', _id }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    updateColumnById: build.mutation<IColumn, IColumn>({
      query: ({ _id, boardId, title, order }) => ({
        url: `/boards/${boardId}/columns/${_id}`,
        method: 'PUT',
        body: { title, order },
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Column', _id }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    deleteColumnById: build.mutation<
      IColumn,
      {
        _id: string;
        boardId: string;
      }
    >({
      query: ({ _id, boardId }) => ({
        url: `/boards/${boardId}/columns/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Column', _id }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    getColumnsSet: build.query<IColumn[], { ids: string[]; userId: string }>({
      query: ({ ids, userId }) => `/columnsSet?ids=${ids}&userId=${userId}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    updateColumnsSet: build.mutation<
      IToken,
      Array<{
        _id: Pick<IColumn, '_id'>;
        order: Pick<IColumn, 'order'>;
      }>
    >({
      query: (patch) => ({
        url: `/columnsSet`,
        method: 'PATCH',
        body: patch,
      }),
    }),

    createColumnsSet: build.mutation<IToken, IColumn[]>({
      query: (columns) => ({
        url: `/columnsSet`,
        method: 'PUT',
        body: columns,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useGetColumnByIdQuery,
  useGetColumnsSetQuery,
  useUpdateColumnByIdMutation,
  useDeleteColumnByIdMutation,
  useUpdateColumnsSetMutation,
  useCreateColumnsSetMutation,
} = columns;
