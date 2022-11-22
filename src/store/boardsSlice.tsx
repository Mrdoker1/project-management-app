import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from 'interfaces/IBoard';

export enum actionType {
  Edit = 1,
  Create,
}

interface IBoardsState {
  modal: {
    boardData: IBoard;
    opened: boolean;
    type: actionType;
  };
}

const initialState: IBoardsState = {
  modal: {
    boardData: {
      _id: '',
      title: '',
      owner: '',
      description: '',
      color: '',
      users: [],
    },
    opened: false,
    type: actionType.Edit,
  },
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setModal: (
      state,
      action: PayloadAction<{
        boardData?: IBoard;
        state: boolean;
        type: actionType;
      }>
    ) => {
      if (action.payload.boardData) {
        state.modal.boardData = action.payload.boardData;
      }
      state.modal.opened = action.payload.state;
      state.modal.type = action.payload.type;
    },
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.modal.opened = action.payload;
    },
    setBoardColor: (state, action: PayloadAction<string>) => {
      state.modal.boardData.color = action.payload;
    },
  },
});

export default boardsSlice.reducer;
export const { setModalState, setModal, setBoardColor } = boardsSlice.actions;
