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

export type GameGrid = Symbol[][];

export type MovementDirection = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export type Game = {
  rows: number;
  cols: number;
  grid: GameGrid;
};
