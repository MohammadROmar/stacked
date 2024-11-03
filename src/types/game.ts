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

export type GameGrid = Array<Symbol[]>;

export type MovementDirection = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
