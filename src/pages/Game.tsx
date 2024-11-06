import { useState, useEffect } from 'react';

import Title from '../components/Title';
import Restart from '../components/Game/Restart';
import GameGrid from '../components/Game/Grid';
import WinningModal from '../components/Game/WinningModal';
import { Game } from '../classes/game/game';
import { Controls } from '../classes/controls';
import { copyGrid } from '../utils/copy-grid';
import type { Game as tGame } from '../types/game';
import type { Page } from '../types/page';

type GamePageProps = {
  gameData: tGame;
  setPage(newPae: Page): void;
};

export default function GamePage({ gameData, setPage }: GamePageProps) {
  const { rows, cols, grid: initialGrid } = gameData;

  const [grid, setGrid] = useState(copyGrid(initialGrid));
  const [didWin, setDidWin] = useState(false);
  const [game] = useState(new Game(rows, cols, grid));

  useEffect(() => {
    new Controls(game, setGrid, setDidWin);
  }, []);

  function handleRestart() {
    const copiedGrid = copyGrid(initialGrid);

    game.setNewGrid(copiedGrid);
    setGrid(copiedGrid);
  }

  return (
    <>
      {didWin && <WinningModal setPage={setPage} />}

      {!didWin && <Restart onRestart={handleRestart} />}

      <section className="section flex flex-col justify-center items-center">
        <Title />
        <GameGrid cols={cols} grid={grid} />
      </section>
    </>
  );
}
