import { handleMoveUp } from './up';
import { handleMoveRight } from './right';
import { handleMoveDown } from './down';
import { handleMoveLeft } from './left';
import { isColor } from '../is-color';
import type { Cell } from '../../models/cell';
import type { MoveInfo } from '../../models/move-info';

export function handleMove(cell: Cell, moveInfo: MoveInfo) {
  if (!moveInfo.moveDirection || !isColor(cell.symbol)) {
    return { offsetX: 0, offsetY: 0, merged: false };
  }

  switch (moveInfo.moveDirection) {
    case 'UP':
      return handleMoveUp(cell, moveInfo);

    case 'RIGHT':
      return handleMoveRight(cell, moveInfo);

    case 'DOWN':
      return handleMoveDown(cell, moveInfo);

    case 'LEFT':
      return handleMoveLeft(cell, moveInfo);
  }
}
