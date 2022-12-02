import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IColumnState {
  isOpen: boolean;
}

const initialState: IColumnState = {
  isOpen: false,
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export default columnSlice.reducer;
export const { setIsOpen } = columnSlice.actions;
