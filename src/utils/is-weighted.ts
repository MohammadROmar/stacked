import type { GameMode } from '../types/game-mode';

export function isWeighted(solveMethod: GameMode) {
  if (
    solveMethod === 'BFS' ||
    solveMethod === 'DFS' ||
    solveMethod === 'USER' ||
    solveMethod === 'Recursive DFS'
  ) {
    return false;
  }

  return true;
}
