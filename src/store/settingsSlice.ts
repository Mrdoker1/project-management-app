import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFromStorage } from 'utils/helpers';

interface ISettingsState {
  lang: string;
}

const defaultState: ISettingsState = {
  lang: 'English',
};

const storageProfile: ISettingsState | undefined = getFromStorage('settings');
const initialState = storageProfile || defaultState;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = settingsSlice.actions;

export default settingsSlice.reducer;
