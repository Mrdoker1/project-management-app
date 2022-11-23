import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'interfaces/IUser';

interface IUsersState {
  users: Array<IUser>;
}

const initialState: IUsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Array<IUser>>) => {
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
