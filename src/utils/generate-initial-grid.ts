import type { Symbol } from '../types/game';

export function generateInitialGrid(rows: number, cols: number): Symbol[][] {
  const grid: Symbol[][] = [];

  for (let i = 0; i < rows; i++) {
    grid.push([]);
    
    for (let j = 0; j < cols; j++) {
      grid[i].push('.');
    }
  }

  return grid;
}
