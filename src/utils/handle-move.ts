import { isColor } from './is-color';
import type { Cell } from '../types/cell';
import type { Grid } from '../types/grid';
import type { MovementDirection } from '../types/movement-direction';
import type { Symbol } from '../types/symbol';

export function handleMove(
  { x, y, symbol }: Cell,
  grid: Grid,
  prevGrid: Grid | undefined,
  direction: MovementDirection | undefined
) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (!direction || !isColor(symbol)) {
    return { offsetX: 0, offsetY: 0, merged: false };
  }

  let offset = 0;
  const merged = false;

  switch (direction) {
    case 'UP': {
      const column: Symbol[] = [];
      for (let i = 0; i < rows; i++) {
        column.push(prevGrid ? prevGrid[i][y] : grid[i][y]);
      }

      for (let i = 0; i < x; i++) {
        const cell = column[i];
        const nextCell = column[i + 1];

        if (isColor(nextCell) && (cell === '.' || cell === nextCell)) {
          column[i] = nextCell;
          column[i + 1] = '.';
          i = -1;
        }
      }

      for (let i = x; i >= 0; i--) {
        if (column[i] === symbol) {
          offset = i - x;
          break;
        }
      }

      return { offsetX: 0, offsetY: offset, merged };
    }

    case 'RIGHT': {
      const row = [...(prevGrid ? prevGrid[x] : grid[x])];

      for (let i = cols - 1; i > y; i--) {
        const cell = row[i];
        const nextCell = row[i - 1];

        if (isColor(nextCell) && (cell === '.' || cell === nextCell)) {
          row[i] = nextCell;
          row[i - 1] = '.';
          i = cols;
        }
      }

      for (let i = y; i < cols; i++) {
        if (row[i] === symbol) {
          offset = i - y;
          break;
        }
      }

      return { offsetX: offset, offsetY: 0, merged };
    }

    case 'DOWN': {
      const column: Symbol[] = [];
      for (let i = 0; i < rows; i++) {
        column.push(prevGrid ? prevGrid[i][y] : grid[i][y]);
      }

      for (let i = rows - 1; i > x; i--) {
        const cell = column[i];
        const nextCell = column[i - 1];

        if (isColor(nextCell) && (cell === '.' || cell === nextCell)) {
          column[i] = nextCell;
          column[i - 1] = '.';
          i = rows;
        }
      }

      for (let i = x; i < rows; i++) {
        if (column[i] === symbol) {
          offset = i - x;
          break;
        }
      }
      return { offsetX: 0, offsetY: offset, merged };
    }

    case 'LEFT': {
      const row = [...(prevGrid ? prevGrid[x] : grid[x])];

      for (let i = 0; i < y; i++) {
        const cell = row[i];
        const nextCell = row[i + 1];

        if (isColor(nextCell) && (cell === '.' || cell === nextCell)) {
          row[i] = nextCell;
          row[i + 1] = '.';
          i = -1;
        }
      }

      for (let i = y; i >= 0; i--) {
        if (row[i] === symbol) {
          offset = i - y;
          break;
        }
      }

      return { offsetX: offset, offsetY: 0, merged };
    }
  }
}
