import { IToken } from 'interfaces/IToken';
import { IColumn } from './../../interfaces/IColumn';
import { api } from './../api';

const columns = api.injectEndpoints({
  endpoints: (build) => ({
    getColumns: build.query<IColumn[], string>({
      query: (boardId) => `/boards/${boardId}/columns`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    createColumn: build.mutation<
      IToken,
      { column: Omit<IColumn, '_id' | 'boardId'>; boardId: Pick<IColumn, 'boardId'> }
    >({
      query: ({ column, boardId }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body: column,
      }),
    }),
    getColumnById: build.query<IColumn[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    updateColumnById: build.mutation<IToken, IColumn>({
      query: (column) => ({
        url: `/boards/${column.boardId}/columns/${column._id}`,
        method: 'PUT',
        body: column,
      }),
    }),
    deleteColumnById: build.mutation<
      IToken,
      {
        boardId: string;
        columnId: string;
      }
    >({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
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
