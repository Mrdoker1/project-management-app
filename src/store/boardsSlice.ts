import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum actionType {
  Edit = 1,
  Create,
}

interface IBoardsState {
  search: string;
  selectedBoardId: string;
  boardColors: {
    [key: string]: {
      color: string;
    };
  };
  modal: {
    board: {
      id: string;
    };
    opened: boolean;
    type: actionType;
  };
}

const initialState: IBoardsState = {
  search: '',
  selectedBoardId: '',
  boardColors: {},
  modal: {
    board: {
      id: '',
    },
    opened: false,
    type: actionType.Edit,
  },
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.modal.opened = action.payload;
    },
    setModalType: (state, action: PayloadAction<actionType>) => {
      state.modal.type = action.payload;
    },
    setModalBoardId: (state, action: PayloadAction<string>) => {
      state.modal.board.id = action.payload;
    },
    setBoardsSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSelectedBoardId: (state, action: PayloadAction<string>) => {
      state.selectedBoardId = action.payload;
    },
    setSelectedBoardColor: (state, action: PayloadAction<{ boardID: string; color: string }>) => {
      const obj = {
        [action.payload.boardID]: {
          color: action.payload.color,
        },
      };

      if (state.boardColors[action.payload.boardID]) {
        Object.assign(state.boardColors[action.payload.boardID], obj[action.payload.boardID]);
      } else {
        Object.assign(state.boardColors, state.boardColors, obj);
      }
    },
  },
});

export default boardsSlice.reducer;
export const {
  setModalState,
  setModalBoardId,
  setModalType,
  setBoardsSearch,
  setSelectedBoardId,
  setSelectedBoardColor,
} = boardsSlice.actions;
