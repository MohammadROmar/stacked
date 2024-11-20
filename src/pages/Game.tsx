import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useGameSelector } from '../store/hooks';
import WinningModal from '../components/Game/WinningModal';
import ErrorModal from '../components/ErrorModal';
import Title from '../components/Title';
import Restart from '../components/Game/Restart';
import Grid from '../components/Game/Grid';
import Info from '../components/Game/Info';
import { Game } from '../classes/game';
import { Controls } from '../classes/controls';
import { GameSolver } from '../classes/game-solver';
import { copyGrid } from '../utils/copy-grid';
import { isWeighted } from '../utils/is-weighted';
import type { GameGrid } from '../types/game';

export default function GamePage() {
  const {
    rows,
    cols,
    grid: initialGrid,
  } = useGameSelector((state) => state.initialGame.data);
  const solveMethod = useGameSelector((state) => state.mode.data);

  const [grid, setGrid] = useState<GameGrid>({
    moves: 0,
    cells: copyGrid(initialGrid),
    cost: isWeighted(solveMethod) ? 0 : undefined,
  });
  const [didWin, setDidWin] = useState(false);
  const [error, setError] = useState<string>();

  const game = useMemo(
    () => new Game(rows, cols, copyGrid(initialGrid)),
    [rows, cols, initialGrid]
  );
  const controls = useMemo(
    () => new Controls(game, setGrid, setDidWin),
    [game]
  );

  useEffect(() => {
    if (solveMethod === 'USER') {
      controls.setupControls();
    } else {
      try {
        new GameSolver(game, solveMethod, setGrid, setDidWin);
      } catch (e) {
        const error = e as Error;
        setError(error.message);
      }
    }
  }, [game, controls, initialGrid, solveMethod]);

  function handleRestart() {
    const copiedGrid = copyGrid(initialGrid);

    controls.resetControls();
    game.setNewGrid(copiedGrid);
    setGrid({ moves: 0, cells: copiedGrid, cost: undefined });
  }

  return (
    <>
      <AnimatePresence>
        {error && <ErrorModal error={error} />}
        {didWin && <WinningModal moves={grid.moves} cost={grid.cost} />}
      </AnimatePresence>

      {!didWin && solveMethod === 'USER' && (
        <Restart onRestart={handleRestart} />
      )}

      <section className="section flex flex-col justify-center items-center">
        <Title />
        <Grid cols={cols} grid={grid.cells} />
        <div className="flex items-center gap-4">
          <Info info="Moves" value={grid.moves} />
          {grid.cost !== undefined && (
            <Info
              info={solveMethod === 'A*' ? 'A* Score' : 'Cost'}
              value={grid.cost}
            />
          )}
        </div>
      </section>
    </>
  );
}
