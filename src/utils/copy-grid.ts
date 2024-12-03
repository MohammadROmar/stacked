import type { Grid } from '../types/grid';

export function copyGrid(grid: Grid): Grid {
  const copiedGrid: Grid = [];

  for (let i = 0; i < grid.length; i++) {
    copiedGrid.push([]);

    for (let j = 0; j < grid[i].length; j++) {
      copiedGrid[i].push(grid[i][j]);
    }
  }

  return copiedGrid;
}
