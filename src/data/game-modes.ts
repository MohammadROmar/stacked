import { GameMode } from '../types/game-mode';

export const GAME_MODES: { gameMode: GameMode; description: string }[] = [
  { gameMode: 'USER', description: 'Play by your self' },
  { gameMode: 'BFS', description: 'BFS' },
  { gameMode: 'DFS', description: 'DFS' },
  { gameMode: 'Recursive DFS', description: 'Recursive DFS' },
  { gameMode: 'UCS', description: 'UCS' },
];
