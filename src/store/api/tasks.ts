import { ITask } from 'interfaces/ITask';
import { IToken } from 'interfaces/IToken';
import { api } from '../api';

const tasks = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}/tasks`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Task' as const, _id })),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    getTaskById: build.query<ITask, { boardId: string; columnId: string; _id: string }>({
      query: ({ boardId, columnId, _id }) => `/boards/${boardId}/columns/${columnId}/tasks/${_id}`,
      providesTags: (result, error, { _id }) => [{ type: 'Task', _id }],
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    createTask: build.mutation<ITask, Omit<ITask, '_id'>>({
      query: ({ boardId, columnId, ...task }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    updateTaskById: build.mutation<ITask, ITask>({
      query: ({ boardId, columnId, _id, ...task }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${_id}`,
        method: 'PUT',
        body: { ...task, columnId },
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Task', _id }],
    }),

    deleteTaskById: build.mutation<ITask, { boardId: string; columnId: string; _id: string }>({
      query: ({ boardId, columnId, _id }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Task', _id },
        { type: 'Task', id: 'LIST' },
      ],
    }),

    getTasksSet: build.query<ITask[], { ids: Array<string>; userId: string; searchQuery: string }>({
      query: ({ ids, userId, searchQuery }) =>
        `/tasksSet?ids=${ids}&userId=${userId}&search=${searchQuery}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    getTasksSetByBoardId: build.query<ITask[], string>({
      query: (boardId) => `/tasksSet/${boardId}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),

    updateTasksSet: build.mutation<IToken, Array<{ _id: string; order: number; columnId: string }>>(
      {
        query: (patch) => ({
          url: `/tasksSet`,
          method: 'PATCH',
          body: patch,
        }),
      }
    ),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useDeleteTaskByIdMutation,
  useUpdateTaskByIdMutation,
  useGetTasksSetQuery,
  useUpdateTasksSetMutation,
  useGetTasksSetByBoardIdQuery,
  useLazyGetTasksSetQuery,
} = tasks;
