import { Dispatch, SetStateAction } from 'react';

import type { Game, Symbol } from './game';
import type { Page } from './page';
import type { GameMode } from './game-mode';

export type InitializeGridPageProps = {
  gameData: Game;
  gameMode: GameMode;
  setGameMode: (newMode: GameMode) => void;
  setPage(page: Page): void;
  changeGameData: Dispatch<SetStateAction<Game>>;
};

export type GameInitializerProps = {
  gameData: Game;
  selectedColor: Symbol;
  changeGameData: Dispatch<SetStateAction<Game>>;
};
