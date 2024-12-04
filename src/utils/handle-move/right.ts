import { isColor } from '../is-color';
import type { Cell } from '../../types/cell';
import type { MoveInfo } from '../../types/move-info';

export function handleMoveRight(cell: Cell, moveInfo: MoveInfo) {
  const { x, y, symbol } = cell;
  const { grid, prevGrid } = moveInfo;

  let offset = 0;
  let merged = false;
  const cols = grid[0].length;

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

  for (let i = y + 1; i < cols; i++) {
    const cell = prevGrid ? prevGrid[x][i] : grid[x][i];

    if (cell === symbol) {
      merged = true;
      break;
    } else if (cell === '#' || (isColor(cell) && cell !== symbol)) {
      break;
    }
  }

  return { offsetX: offset, offsetY: 0, merged };
}
