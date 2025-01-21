import { isColor } from '../is-color';
import type { Symbol } from '../../models/symbol';
import type { Cell } from '../../models/cell';
import type { MoveInfo } from '../../models/move-info';

export function handleMoveDown(cell: Cell, moveInfo: MoveInfo) {
  const { x, y, symbol } = cell;
  const { grid, prevGrid } = moveInfo;

  let offset = 0;
  let merged = false;
  const rows = grid.length;

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

  for (let i = x + 1; i < rows; i++) {
    const cell = prevGrid ? prevGrid[i][y] : grid[i][y];

    if (cell === symbol) {
      merged = true;
      break;
    } else if (cell === '#' || (isColor(cell) && cell !== symbol)) {
      break;
    }
  }

  return { offsetX: 0, offsetY: offset, merged };
}
