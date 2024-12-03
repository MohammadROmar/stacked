import { configureStore } from '@reduxjs/toolkit';

import initialGameReducer from './slices/initial-game';
import modeReducer from './slices/mode';
import pageReducer from './slices/page';

export const store = configureStore({
  reducer: {
    initialGame: initialGameReducer,
    mode: modeReducer,
    page: pageReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
