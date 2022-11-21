import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFromStorage } from 'utils/helpers';
import { RootState } from './store';

interface IAuthState {
  token: string;
}

const defaultState: IAuthState = {
  token: '',
};

const storageAuth: IAuthState | undefined = getFromStorage('auth');
const initialState = storageAuth || defaultState;

// console.log('createAuthSlice');

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
