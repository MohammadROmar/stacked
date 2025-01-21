import { isWeighted } from '../utils/is-weighted';
import type { GameState } from '../models/game-state';
import type { Grid } from '../models/grid';
import type { GameMode } from '../models/game-mode';

export function initializeState(grid: Grid, solveMethod?: GameMode): GameState {
  return {
    prevGrid: undefined,
    moves: 0,
    cells: grid,
    cost: solveMethod && isWeighted(solveMethod) ? 0 : undefined,
    moveDirection: undefined,
    totalVisitedStates: undefined,
    time: solveMethod && isWeighted(solveMethod) ? 0 : undefined,
  };
}
