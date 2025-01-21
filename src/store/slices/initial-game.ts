import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { generateInitialGrid } from '../../utils/generate-initial-grid';
import type { Game } from '../../models/game';

const initialGameState: { data: Game } = {
  data: { rows: 4, cols: 4, grid: generateInitialGrid(4, 4) },
};

const initialGameSlice = createSlice({
  name: 'initialGame',
  initialState: initialGameState,
  reducers: {
    setInitialGame(state, action: PayloadAction<Game>) {
      state.data = action.payload;
    },
  },
});

export default initialGameSlice.reducer;

export const { setInitialGame } = initialGameSlice.actions;
