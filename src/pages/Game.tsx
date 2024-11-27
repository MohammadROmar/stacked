import { useState, useEffect, useMemo } from 'react';

import { useGameSelector } from '../store/hooks';
import WinningModal from '../components/Game/WinningModal';
import ErrorModal from '../components/ErrorModal';
import Title from '../components/Title';
import Restart from '../components/Game/Restart';
import Grid from '../components/Game/Grid';
import SolveInfo from '../components/Game/SolveInfo';
import { Game } from '../classes/game';
import { Controls } from '../classes/controls';
import { GameSolver } from '../classes/game-solver';
import { copyGrid } from '../utils/copy-grid';
import { initialState } from '../data/initialze-grid';
import type { GameGrid } from '../types/game';

export default function GamePage() {
  const { rows, cols, grid } = useGameSelector(
    (state) => state.initialGame.data
  );
  const solveMethod = useGameSelector((state) => state.mode.data);

  const [gameState, setGameState] = useState<GameGrid>(
    initialState(copyGrid(grid), solveMethod)
  );
  const [didWin, setDidWin] = useState(false);
  const [error, setError] = useState<string>();

  const game = useMemo(
    () => new Game(rows, cols, copyGrid(grid)),
    [rows, cols, grid]
  );
  const controls = useMemo(
    () => new Controls(game, setGameState, setDidWin),
    [game]
  );

  useEffect(() => {
    if (solveMethod === 'USER') {
      controls.setupControls();
    } else {
      try {
        new GameSolver(game, solveMethod, setGameState, setDidWin);
      } catch (e) {
        const error = e as Error;
        setError(error.message);
      }
    }
  }, [game, controls, grid, solveMethod]);

  function handleRestart() {
    const copiedGrid = copyGrid(grid);

    controls.resetControls();
    game.setNewGrid(copiedGrid);
    setGameState(initialState(copiedGrid));
  }

  return (
    <>
      {error && <ErrorModal error={error} />}
      {didWin && <WinningModal moves={gameState.moves} cost={gameState.cost} />}
      {!didWin && solveMethod === 'USER' && (
        <Restart onRestart={handleRestart} />
      )}

      <section className="section flex flex-col justify-center items-center">
        <Title />
        <Grid grid={gameState.cells} />
        <SolveInfo gameState={gameState} />
      </section>
    </>
  );
}
