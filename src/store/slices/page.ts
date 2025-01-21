import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Page } from '../../models/page';

const initialPageState: { data: Page } = { data: 'START' };

const pageSlice = createSlice({
  name: 'page',
  initialState: initialPageState,
  reducers: {
    setPage(state, action: PayloadAction<Page>) {
      state.data = action.payload;
    },
  },
});

export default pageSlice.reducer;

export const { setPage } = pageSlice.actions;
