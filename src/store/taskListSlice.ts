import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from 'interfaces/ITask';

export enum BoardAction {
  delete = 1,
  update = 2,
  create = 3,
  drag = 4,
}

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
      action: PayloadAction<{ boardID: string; columnID: string; array: Array<ITask> }>
    ) => {
      const sortedList = [...action.payload.array];
      sortedList.sort((a: ITask, b: ITask) => a.order - b.order);

      const obj = {
        [action.payload.boardID]: {
          [action.payload.columnID]: sortedList,
        },
      };

      if (state[action.payload.boardID]) {
        Object.assign(state[action.payload.boardID], obj[action.payload.boardID]);
      } else {
        Object.assign(state, state, obj);
      }
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
    setTaskByOrder: (
      state,
      action: PayloadAction<{ boardID: string; columnID: string; order: number; task: ITask }>
    ) => {
      state[action.payload.boardID][action.payload.columnID][action.payload.order] =
        action.payload.task;
    },
    addTask: (state, action: PayloadAction<{ boardID: string; columnID: string; task: ITask }>) => {
      state[action.payload.boardID][action.payload.columnID] = [
        ...state[action.payload.boardID][action.payload.columnID],
        action.payload.task,
      ];
    },
  },
});

export default taskListSlice.reducer;
export const { setTasks, setTasksByColumn, setTaskByOrder, addTask } = taskListSlice.actions;
