import type { Game } from '../models/game';

export function isEmptyGrid(gridData: Game) {
  let emptyCells = 0;

  const { rows, cols, grid } = gridData;
  grid.map((symbolsList) =>
    symbolsList.map((symbol) =>
      symbol === '.' || symbol === '#' ? emptyCells++ : null
    )
  );

  return emptyCells === rows * cols;
}
