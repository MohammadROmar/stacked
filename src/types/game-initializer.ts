import { Dispatch, SetStateAction } from 'react';

import type { Game, Symbol } from './game';
import type { Page } from './page';

export type InitializeGridPageProps = {
  gameData: Game;
  setPage(page: Page): void;
  changeGameData: Dispatch<SetStateAction<Game>>;
};

export type GameInitializerProps = {
  gameData: Game;
  selectedColor: Symbol;
  changeGameData: Dispatch<SetStateAction<Game>>;
};
