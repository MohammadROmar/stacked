import type { GameMode } from '../models/game-mode';

export function isWeighted(solveMethod: GameMode) {
  const weightedAlgorithms: GameMode[] = ['A*', 'Hill Climbing', 'UCS'];

  return weightedAlgorithms.includes(solveMethod);
}
