import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useGameSelector } from '../store/hooks';
import Title from '../components/Title';
import Restart from '../components/Game/Restart';
import GameGrid from '../components/Game/Grid';
import WinningModal from '../components/Game/WinningModal';
import ErrorModal from '../components/ErrorModal';
import { Game } from '../classes/game/game';
import { Controls } from '../classes/controls';
import { GameSolver } from '../classes/game-solver';
import { copyGrid } from '../utils/copy-grid';

export default function GamePage() {
  const {
    rows,
    cols,
    grid: initialGrid,
  } = useGameSelector((state) => state.initialGame.data);
  const solveMethod = useGameSelector((state) => state.mode.data);

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
      } catch (e) {
        const error = e as Error;
        setError(error.message);
      }
    }
  }, [game, solveMethod]);

  function handleRestart() {
    const copiedGrid = copyGrid(initialGrid);

    game.setNewGrid(copiedGrid);
    setGrid(copiedGrid);
  }

  return (
    <>
      <AnimatePresence>
        {error && <ErrorModal error={error} />}
        {didWin && <WinningModal />}
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
