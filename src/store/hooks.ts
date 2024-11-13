import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

import type { RootState, AppDispatch } from './';

type DispatchFunction = () => AppDispatch;

export const useGameSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useGameDispatch: DispatchFunction = useDispatch;
