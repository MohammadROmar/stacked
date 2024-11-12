import { useEffect, useState } from 'react';

import type { Game as tGame } from '../types/game';
import type { Page } from '../types/page';
import Tiltle from '../components/Title';
import GameGrid from '../components/Game/Grid';
import { GameSolver } from '../classes/game-solver';
import { Game } from '../classes/game/game';
import WinningModal from '../components/Game/WinningModal';

type AutoSolvePageProps = {
  solveMethod: 'DFS' | 'BFS';
  gameData: tGame;
  setPage(newPae: Page): void;
};

export default function AutoSolvePage({
  gameData,
  setPage,
}: AutoSolvePageProps) {
  const { rows, cols, grid: initialGrid } = gameData;

  const [grid, setGrid] = useState(initialGrid);
  const [didWin, setDidWin] = useState(false);

  useEffect(() => {
    const game = new Game(rows, cols, grid);
    new GameSolver(game, setGrid, setDidWin);
  }, []);

  return (
    <>
      {didWin && <WinningModal setPage={setPage} />}

      <section className="section">
        <Tiltle />

        <GameGrid cols={cols} grid={grid} />
      </section>
    </>
  );
}
