import { GameMode } from '../types/game-mode';

export const GAME_MODS: { gameMode: GameMode; description: string }[] = [
  { gameMode: 'BFS', description: 'BFS' },
  { gameMode: 'DFS', description: 'DFS' },
  { gameMode: 'USER', description: 'Play by your self' },
];
