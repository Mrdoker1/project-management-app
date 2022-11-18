import { ITask } from 'interfaces/ITask';
import { IUser } from 'interfaces/IUser';
import { IToken } from 'interfaces/IToken';
import { api } from '../api';

const tasks = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<ITask[], { boardId: Pick<ITask, 'boardId'>; columnId: Pick<ITask, 'columnId'> }>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}/tasks`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    getTasksById: build.query<ITask[], { boardId: Pick<ITask, 'boardId'>; columnId: Pick<ITask, 'columnId'>; taskId: Pick<ITask, '_id'> }>({
      query: ({ boardId, columnId, taskId }) =>
        `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    updateTaskById: build.mutation<IToken, ITask>({
      query: (task) => ({
        url: `/boards/${task.boardId}/columns/${task.columnId}/tasks/${task._id}`,
        method: 'PUT',
        body: task,
      }),
    }),
    createTask: build.mutation<IToken, { task: Omit<ITask, '_id' | 'boardId' | 'columnId'>; boardId: Pick<ITask, 'boardId'>; columnId: Pick<ITask, 'columnId'> }>({
      query: ({ task, boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: task,
      }),
    }),
    deleteTaskById: build.mutation<IToken, { boardId: Pick<ITask, 'boardId'>; columnId: Pick<ITask, 'columnId'>; taskId: Pick<ITask, '_id'> }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks${taskId}`,
        method: 'DELETE',
      }),
    }),
    getTasksSet: build.query<ITask[], { ids: Array<Pick<ITask, '_id'>>; userId: Pick<IUser, '_id'>; searchQuery: string }>({
      query: ({ ids, userId, searchQuery }) =>
        `/tasksSet?ids=${ids}&userId=${userId}&search=${searchQuery}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    getTasksSetByBoardId: build.query<ITask[], Pick<ITask, 'boardId'>>({
      query: (boardId) => `/tasksSet/${boardId}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    updateTasksSet: build.mutation<IToken, Array<{ "_id": Pick<ITask, '_id'>, "order": Pick<ITask, 'order'>, "columnId": Pick<ITask, 'columnId'> }>>({
      query: (patch) => ({
        url: `/tasksSet`,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetTasksByIdQuery,
  useDeleteTaskByIdMutation,
  useUpdateTaskByIdMutation,
  useGetTasksSetQuery,
  useUpdateTasksSetMutation,
  useGetTasksSetByBoardIdQuery,
} = tasks;
