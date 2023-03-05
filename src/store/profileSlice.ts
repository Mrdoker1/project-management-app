import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFromStorage } from 'utils/helpers';

//IUser
interface IProfileState {
  _id: string | undefined;
  name: string | undefined;
  login: string | undefined;
  avatar: string;
}

const defaultState: IProfileState = {
  _id: undefined,
  name: undefined,
  login: undefined,
  avatar: '',
};

const storageProfile: IProfileState | undefined = getFromStorage('profile');
const initialState = storageProfile || defaultState;

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfileState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.avatar = action.payload.avatar;
    },
    clearProfile: (state) => {
      state._id = undefined;
      state.name = undefined;
      state.login = undefined;
      state.avatar = '';
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
