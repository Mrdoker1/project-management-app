import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum actionType {
  Edit = 1,
  Create,
}

interface IBoardsState {
  search: string;
  selectedBoardId: string;
  modal: {
    board: {
      id: string;
    };
    opened: boolean;
    type: actionType;
  };
}

const initialState: IBoardsState = {
  search: '',
  selectedBoardId: '',
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
    setBoardsSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSelectedBoardId: (state, action: PayloadAction<string>) => {
      state.selectedBoardId = action.payload;
    },
  },
});

export default boardsSlice.reducer;
export const { setModalState, setModalBoardId, setModalType, setBoardsSearch, setSelectedBoardId } =
  boardsSlice.actions;
