export type Symbol =
  | '.'
  | '#'
  | 'red'
  | 'blue'
  | 'lime'
  | 'pink'
  | 'cyan'
  | 'green'
  | 'orange'
  | 'purple'
  | 'yellow';

export type Grid = Symbol[][];

export type MovementDirection = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export type Game = {
  rows: number;
  cols: number;
  grid: Grid;
};

export type GameGrid = { moves: number; cells: Grid; cost: number | undefined };
