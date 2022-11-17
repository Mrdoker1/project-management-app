import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface IAuthState {
  token: string;
}

const initialState: IAuthState = {
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload: { token } }: PayloadAction<IAuthState>) => {
      state.token = token;
    },
  },
});

export const { setToken } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
