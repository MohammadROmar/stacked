import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import ErrorModal from '../ErrorModal';
import { isEmptyGrid } from '../../utils/is-empty-grid';
import type { Game } from '../../types/game';
import type { Page } from '../../types/page';

type StartBtnProps = {
  gameData: Game;
  setPage(newPage: Page): void;
};

export default function StartBtn({ gameData, setPage }: StartBtnProps) {
  const [error, setError] = useState<string>();

  const { rows, cols } = gameData;

  function handleGridSubmit() {
    if (rows <= 0 || cols <= 0) {
      setError('Grid must have rows and columns.');
    } else if (isEmptyGrid(gameData)) {
      setError('Grid must contain colors.');
    } // TODO: Check color cells number.
    else {
      setPage('GAME');
    }
  }

  return (
    <>
      <AnimatePresence>
        {error && (
          <ErrorModal error={error} onClose={() => setError(undefined)} />
        )}
      </AnimatePresence>

      <button onClick={handleGridSubmit} className="button w-full mt-2">
        Start!
      </button>
    </>
  );
}
