import { IBoard } from './../../interfaces/IBoard';
import { api } from './../api';

const boards = api.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<IBoard[], void>({
      query: () => `/boards`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
  }),
  overrideExisting: false,
});

export const { useGetBoardsQuery } = boards;
