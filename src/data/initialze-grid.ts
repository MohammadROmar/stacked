import { isWeighted } from '../utils/is-weighted';
import type { GameGrid, Grid } from '../types/game';
import type { GameMode } from '../types/game-mode';

export function initialState(grid: Grid, solveMethod?: GameMode): GameGrid {
  return {
    moves: 0,
    cells: grid,
    cost: solveMethod && isWeighted(solveMethod) ? 0 : undefined,
    totalVisitedStates: undefined,
    time: solveMethod && isWeighted(solveMethod) ? 0 : undefined,
  };
}
