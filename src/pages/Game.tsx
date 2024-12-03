import { useState, useEffect, useMemo } from 'react';

import { useGameSelector } from '../store/hooks';
import WinningModal from '../components/Game/WinningModal';
import ErrorModal from '../components/ErrorModal';
import Title from '../components/Title';
import Grid from '../components/Game/Grid';
import Restart from '../components/Game/Restart';
import SolveInfo from '../components/Game/SolveInfo';
import { Game } from '../classes/game';
import { Controls } from '../classes/controls';
import { GameSolver } from '../classes/game-solver';
import { initializeState } from '../utils/initialize-state';
import { copyGrid } from '../utils/copy-grid';
import type { GameState } from '../types/game-state';

export default function GamePage() {
  const { rows, cols, grid } = useGameSelector(
    (state) => state.initialGame.data
  );
  const solveMethod = useGameSelector((state) => state.mode.data);

  const [gameState, setGameState] = useState<GameState>(
    initializeState(copyGrid(grid), solveMethod)
  );
  const [didWin, setDidWin] = useState(false);
  const [error, setError] = useState<string>();

  const game = useMemo(
    () => new Game(rows, cols, copyGrid(grid)),
    [rows, cols, grid]
  );

  useEffect(() => {
    if (solveMethod === 'USER') {
      new Controls(game, setGameState, setDidWin);
    } else {
      try {
        new GameSolver(game, solveMethod, setGameState, setDidWin);
      } catch (e) {
        const error = e as Error;
        setError(error.message);
      }
    }
  }, [game, solveMethod]);

  return (
    <>
      {error && <ErrorModal error={error} />}
      {didWin && <WinningModal moves={gameState.moves} cost={gameState.cost} />}
      {!didWin && solveMethod === 'USER' && <Restart />}

      <section className="section flex flex-col justify-center items-center">
        <Title />
        <Grid
          grid={gameState.cells}
          prevGrid={gameState.prevGrid}
          moveDirection={gameState.moveDirection}
        />
        <SolveInfo gameState={gameState} />
      </section>
    </>
  );
}
