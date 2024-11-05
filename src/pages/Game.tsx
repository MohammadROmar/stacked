import { useState, useEffect } from 'react';

import Title from '../components/Title';
import GameGrid from '../components/Game/Grid';
import WinningModal from '../components/Game/WinningModal';
import { Game } from '../classes/game/game';
import { Controls } from '../classes/controls';
import type { Game as tGame } from '../types/game';

type GamePageProps = {
  gameData: tGame;
};

export default function GamePage({ gameData }: GamePageProps) {
  const { rows, cols, grid: initialGrid } = gameData;

  const [grid, setGrid] = useState(initialGrid);
  const [didWin, setDidWin] = useState(false);

  useEffect(() => {
    const game = new Game(rows, cols, initialGrid);

    new Controls(game, setGrid, setDidWin);
  }, []);

  return (
    <>
      {didWin && <WinningModal />}

      <section className="section flex flex-col justify-center items-center">
        <Title />
        <GameGrid cols={cols} grid={grid} />
      </section>
    </>
  );
}
