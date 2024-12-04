import type { Grid } from './grid';
import type { MovementDirection } from './movement-direction';

export type MoveInfo = {
  grid: Grid;
  prevGrid: Grid | undefined;
  moveDirection: MovementDirection | undefined;
};
