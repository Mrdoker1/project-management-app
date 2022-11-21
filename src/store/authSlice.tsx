import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFromStorage } from 'utils/helpers';

interface IAuthState {
  token: string;
}

const defaultState: IAuthState = {
  token: '',
};

const storageAuth: IAuthState | undefined = getFromStorage('auth');
const initialState = storageAuth || defaultState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
