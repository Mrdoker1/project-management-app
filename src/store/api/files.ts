import { IFile } from 'interfaces/IFile';
import { ITask } from 'interfaces/ITask';
import { IUser } from 'interfaces/IUser';
import { IToken } from 'interfaces/IToken';
import { api } from '../api';

const files = api.injectEndpoints({
  endpoints: (build) => ({
    getFiles: build.query<IFile[], { ids: Array<Pick<ITask, 'columnId'>>, userId: Pick<IUser, '_id'>; taskId: Pick<IFile, 'taskId'> }>({
      query: ({ ids, userId, taskId }) => `/file?ids=${ids}&userId=${userId}&taskId=${taskId}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    getFilesByBoardId: build.query<IFile[], Pick<IFile, 'boardId'>>({
        query: (boardId) => `/file/${boardId}`,
        transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    uploadFile: build.mutation<IToken, Omit<IFile, '_id'>>({
        query: (file) => ({
          url: `/file`,
          method: 'POST',
          body: file,
        }),
    }),
    deleteFileById: build.mutation<IToken, Pick<IFile, '_id'>>({
        query: (fileId) => ({
          url: `/file/${fileId}`,
          method: 'DELETE',
        }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFilesQuery,
  useGetFilesByBoardIdQuery,
  useUploadFileMutation,
  useDeleteFileByIdMutation
} = files;
