import type { GameGrid } from '../types/game';

export function copyGrid(grid: GameGrid): GameGrid {
  const copiedGrid: GameGrid = [];

  for (let i = 0; i < grid.length; i++) {
    copiedGrid.push([]);

    for (let j = 0; j < grid[i].length; j++) {
      copiedGrid[i].push(grid[i][j]);
    }
  }

  return copiedGrid;
}
