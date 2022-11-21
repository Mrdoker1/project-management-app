import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBoardsState {
  modal: {
    opened: boolean;
  };
}

const initialState: IBoardsState = {
  modal: {
    opened: false,
  },
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.modal.opened = action.payload;
    },
  },
});

export default boardsSlice.reducer;
export const { setModalState } = boardsSlice.actions;
