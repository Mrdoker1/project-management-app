import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from 'interfaces/ITask';

interface ITaskListState {
  [key: string]: {
    [key: string]: Array<ITask>;
  };
}

const initialState: ITaskListState = {};

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    setTasks: (
      state,
      action: PayloadAction<{ boardId: string; columnId: string; array: Array<ITask> }>
    ) => {
      const sortedList = [...action.payload.array];
      sortedList.sort((a: ITask, b: ITask) => a.order - b.order);

      const obj = {
        [action.payload.boardId]: {
          [action.payload.columnId]: sortedList,
        },
      };

      if (state[action.payload.boardId]) {
        Object.assign(state[action.payload.boardId], obj[action.payload.boardId]);
      } else {
        Object.assign(state, state, obj);
      }

      //console.log(obj);
    },
    setTasksByColumn: (
      state,
      action: PayloadAction<{ boardID: string; columnID: string; array: Array<ITask> }>
    ) => {
      //const sortedList = action.payload.array.sort((a: ITask, b: ITask) => a.order - b.order);
      const sortedList = [...action.payload.array];
      sortedList.sort((a: ITask, b: ITask) => a.order - b.order);
      state[action.payload.boardID][action.payload.columnID] = sortedList;
    },
  },
});

export default taskListSlice.reducer;
export const { setTasks, setTasksByColumn } = taskListSlice.actions;
