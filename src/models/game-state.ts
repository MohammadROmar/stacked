import type { MovementDirection } from './movement-direction';
import { Grid } from './grid';

export type GameState = {
  prevGrid: Grid | undefined;
  moves: number;
  cells: Grid;
  cost: number | undefined;
  moveDirection: MovementDirection | undefined;
  totalVisitedStates: number | undefined;
  time: number | undefined;
};
