import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum actionType {
  Edit = 1,
  Create,
}

interface IBoardsState {
  modal: {
    board: {
      id: string;
    };
    opened: boolean;
    type: actionType;
  };
}

const initialState: IBoardsState = {
  modal: {
    board: {
      id: '',
    },
    opened: false,
    type: actionType.Edit,
  },
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.modal.opened = action.payload;
    },
    setModalType: (state, action: PayloadAction<actionType>) => {
      state.modal.type = action.payload;
    },
    setModalBoardId: (state, action: PayloadAction<string>) => {
      state.modal.board.id = action.payload;
    },
  },
});

export default boardsSlice.reducer;
export const { setModalState, setModalBoardId, setModalType } = boardsSlice.actions;
