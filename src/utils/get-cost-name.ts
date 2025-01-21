import { GameMode } from '../models/game-mode';

export function getCostName(solveAlgorithm: GameMode) {
  if (solveAlgorithm === 'A*') {
    return 'A* Score';
  } else if (solveAlgorithm === 'Hill Climbing') {
    return 'Heuristic';
  } else {
    return 'Cost';
  }
}
