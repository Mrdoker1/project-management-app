import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICreatingTask {
  boardId: string;
  columnId: string;
  order: number;
}

interface IUpdatingTask extends ICreatingTask {
  _id: string;
  title: string;
  description: string;
  userId: string;
  users: Array<string>;
}

interface ITaskState {
  isOpen: boolean;
  isEdit: boolean;
  creatingTask: ICreatingTask | undefined;
  updatingTask: IUpdatingTask | undefined;
}

const initialState: ITaskState = {
  isOpen: false,
  isEdit: false,
  creatingTask: undefined,
  updatingTask: undefined,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    setCreatingTask: (state, action: PayloadAction<ICreatingTask>) => {
      state.creatingTask = action.payload;
    },
    setUpdatingTask: (state, action: PayloadAction<IUpdatingTask>) => {
      state.updatingTask = action.payload;
    },
  },
});

export default taskSlice.reducer;
export const { setIsOpen, setIsEdit, setCreatingTask, setUpdatingTask } = taskSlice.actions;
