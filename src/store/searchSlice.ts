import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFromStorage } from 'utils/helpers';

interface ISearchState {
  query: string;
}

const defaultState: ISearchState = {
  query: '',
};

const storageSearch: ISearchState | undefined = getFromStorage('search');
const initialState = storageSearch || defaultState;

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
