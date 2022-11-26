import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISettingsState {
  isOpened: boolean;
}

const defaultState: ISettingsState = {
  isOpened: false,
};

const initialState = defaultState;

export const menuSlice = createSlice({
  name: 'mobile menu',
  initialState,
  reducers: {
    setMenuState: (state, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
    },
  },
});

export const { setMenuState } = menuSlice.actions;

export default menuSlice.reducer;
