import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Title from '../components/Title';
import Restart from '../components/Game/Restart';
import GameGrid from '../components/Game/Grid';
import WinningModal from '../components/Game/WinningModal';
import ErrorModal from '../components/ErrorModal';
import { Game } from '../classes/game/game';
import { Controls } from '../classes/controls';
import { GameSolver } from '../classes/game-solver';
import { copyGrid } from '../utils/copy-grid';
import type { Game as tGame } from '../types/game';
import type { Page } from '../types/page';
import type { GameMode } from '../types/game-mode';

type GamePageProps = {
  gameData: tGame;
  solveMethod: GameMode;
  setPage(newPae: Page): void;
};

export default function GamePage({
  solveMethod,
  gameData,
  setPage,
}: GamePageProps) {
  const { rows, cols, grid: initialGrid } = gameData;

  const [grid, setGrid] = useState(copyGrid(initialGrid));
  const [didWin, setDidWin] = useState(false);
  const [error, setError] = useState<string>();
  const [game] = useState(new Game(rows, cols, grid));

  useEffect(() => {
    if (solveMethod === 'USER') {
      new Controls(game, setGrid, setDidWin);
    } else {
      try {
        new GameSolver(game, solveMethod, setGrid, setDidWin);
      } catch (_) {
        setError('Could not find a solution for the given grid.');
      }
    }
  }, []);

  function handleRestart() {
    const copiedGrid = copyGrid(initialGrid);

    game.setNewGrid(copiedGrid);
    setGrid(copiedGrid);
  }

  return (
    <>
      <AnimatePresence>
        {error && <ErrorModal error={error} onClose={() => setPage('START')} />}
        {didWin && <WinningModal setPage={setPage} />}
      </AnimatePresence>

      {!didWin && solveMethod === 'USER' && (
        <Restart onRestart={handleRestart} />
      )}

      <section className="section flex flex-col justify-center items-center">
        <Title />
        <GameGrid cols={cols} grid={grid} />
      </section>
    </>
  );
}
