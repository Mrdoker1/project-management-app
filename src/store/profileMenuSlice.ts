import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProfileMenuState {
  profileIsOpened: boolean;
  profileEditIsOpened: boolean;
  profileBoardSearch: string;
}

const defaultState: IProfileMenuState = {
  profileIsOpened: false,
  profileEditIsOpened: false,
  profileBoardSearch: '',
};

const initialState = defaultState;

export const profileMenuSlice = createSlice({
  name: 'profile menu',
  initialState,
  reducers: {
    setProfileMenuState: (state, action: PayloadAction<boolean>) => {
      state.profileIsOpened = action.payload;
    },
    setProfileEditState: (state, action: PayloadAction<boolean>) => {
      state.profileEditIsOpened = action.payload;
    },
    setProfileBoardsSearch: (state, action: PayloadAction<string>) => {
      state.profileBoardSearch = action.payload;
    },
  },
});

export const { setProfileMenuState, setProfileEditState, setProfileBoardsSearch } =
  profileMenuSlice.actions;

export default profileMenuSlice.reducer;
