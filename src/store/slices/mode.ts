import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { GameMode } from '../../types/game-mode';

const initiaModelState: { data: GameMode } = { data: 'USER' };

export const modeSlice = createSlice({
  name: 'mode',
  initialState: initiaModelState,
  reducers: {
    setMode(state, action: PayloadAction<GameMode>) {
      state.data = action.payload;
    },
  },
});

export default modeSlice.reducer;

export const { setMode } = modeSlice.actions;
