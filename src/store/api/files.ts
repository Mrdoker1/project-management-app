import { IFile } from 'interfaces/IFile';
import { IToken } from 'interfaces/IToken';
import { api } from '../api';

const files = api.injectEndpoints({
  endpoints: (build) => ({
    getFiles: build.query<IFile[], { ids: string; userId: string; taskId: string }>({
      query: ({ ids, userId, taskId }) => `/file?ids=${ids}&userId=${userId}&taskId=${taskId}`,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    getFilesByBoardId: build.query<IFile[], string>({
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
    deleteFileById: build.mutation<IToken, string>({
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
  useDeleteFileByIdMutation,
} = files;
